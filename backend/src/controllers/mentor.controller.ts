import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';
import { AIService } from '../services/ai.service';

const prisma = new PrismaClient();
const aiService = new AIService();

export class MentorController {
  private parseTags(tags: string | null): string[] {
    if (!tags) return [];
    try {
      const parsed = JSON.parse(tags);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  private transformProfile(profile: any) {
    if (!profile) return null;
    return {
      ...profile,
      expertiseTags: this.parseTags(profile.expertiseTags),
      industryTags: this.parseTags(profile.industryTags),
      skillTags: this.parseTags(profile.skillTags),
    };
  }

  // Get current mentor's profile
  getMyProfile = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id;
      
      const mentorProfile = await prisma.mentorProfile.findUnique({
        where: { userId },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              avatar: true,
              profile: true
            }
          },
          education: true,
          workExperience: true,
          businesses: true,
          availability: true
        }
      });

      if (!mentorProfile) {
        return res.status(404).json({
          success: false,
          error: 'Mentor profile not found'
        });
      }

      res.json({
        success: true,
        data: this.transformProfile(mentorProfile)
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };

  // Create or update mentor profile
  upsertProfile = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id;
      const {
        yearsOfExperience,
        currentCompany,
        currentTitle,
        industry,
        expertiseTags,
        industryTags,
        skillTags,
        instantRate,
        scheduledRate,
        headline,
        bio
      } = req.body;

      // Upsert mentor profile
      const mentorProfile = await prisma.mentorProfile.upsert({
        where: { userId },
        update: {
          yearsOfExperience: yearsOfExperience ? parseInt(yearsOfExperience) : undefined,
          currentCompany,
          currentTitle,
          industry,
          expertiseTags: expertiseTags ? JSON.stringify(expertiseTags) : undefined,
          industryTags: industryTags ? JSON.stringify(industryTags) : undefined,
          skillTags: skillTags ? JSON.stringify(skillTags) : undefined,
          instantRate: instantRate ? parseFloat(instantRate) : undefined,
          scheduledRate: scheduledRate ? parseFloat(scheduledRate) : undefined
        },
        create: {
          userId: userId!,
          yearsOfExperience: yearsOfExperience ? parseInt(yearsOfExperience) : 0,
          currentCompany,
          currentTitle,
          industry,
          expertiseTags: JSON.stringify(expertiseTags || []),
          industryTags: JSON.stringify(industryTags || []),
          skillTags: JSON.stringify(skillTags || []),
          instantRate: instantRate ? parseFloat(instantRate) : 0,
          scheduledRate: scheduledRate ? parseFloat(scheduledRate) : 0
        }
      });

      // Update user's profile with headline and bio
      if (headline || bio) {
        await prisma.profile.update({
          where: { userId },
          data: {
            headline,
            bio
          }
        });
      }

      res.json({
        success: true,
        data: this.transformProfile(mentorProfile)
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };

  // Upload Resume and Generate AI Tags
  uploadResume = async (req: AuthRequest, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, error: 'No file uploaded' });
      }

      const userId = req.user?.id;
      const filePath = req.file.path;
      
      // 1. Extract text
      const text = await aiService.extractTextFromPDF(filePath);
      
      // 2. Generate tags
      const tags = await aiService.generateTagsFromText(text);
      
      // 3. Update Profile with resume info
      await prisma.profile.upsert({
        where: { userId },
        create: {
            userId: userId!,
            resumeUrl: filePath,
            resumeText: text
        },
        update: {
          resumeUrl: filePath, 
          resumeText: text
        }
      });

      // 4. Update MentorProfile with generated tags
      const mentorProfile = await prisma.mentorProfile.upsert({
        where: { userId },
        create: {
            userId: userId!,
            yearsOfExperience: 0,
            expertiseTags: JSON.stringify(tags.expertise),
            industryTags: JSON.stringify(tags.industry),
            skillTags: JSON.stringify(tags.skills),
            instantRate: 0,
            scheduledRate: 0
        },
        update: {
            expertiseTags: JSON.stringify(tags.expertise),
            industryTags: JSON.stringify(tags.industry),
            skillTags: JSON.stringify(tags.skills),
        }
      });

      res.json({
        success: true,
        data: {
          resumeUrl: filePath,
          extractedTags: tags,
          mentorProfile: this.transformProfile(mentorProfile)
        }
      });

    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
  };

  // Add education
  addEducation = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id;
      const { institution, degree, fieldOfStudy, startYear, endYear, achievements } = req.body;

      const mentorProfile = await prisma.mentorProfile.findUnique({
        where: { userId }
      });

      if (!mentorProfile) {
        return res.status(404).json({
          success: false,
          error: 'Mentor profile not found'
        });
      }

      const education = await prisma.education.create({
        data: {
          mentorId: mentorProfile.id,
          institution,
          degree,
          fieldOfStudy,
          startYear: parseInt(startYear),
          endYear: endYear ? parseInt(endYear) : null,
          achievements
        }
      });

      res.status(201).json({
        success: true,
        data: education
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };

  // Add work experience
  addWorkExperience = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id;
      const { company, title, startDate, endDate, isCurrent, location, description, achievements } = req.body;

      const mentorProfile = await prisma.mentorProfile.findUnique({
        where: { userId }
      });

      if (!mentorProfile) {
        return res.status(404).json({
          success: false,
          error: 'Mentor profile not found'
        });
      }

      const workExperience = await prisma.workExperience.create({
        data: {
          mentorId: mentorProfile.id,
          company,
          title,
          startDate: new Date(startDate),
          endDate: endDate ? new Date(endDate) : null,
          isCurrent: isCurrent || false,
          location,
          description,
          achievements
        }
      });

      res.status(201).json({
        success: true,
        data: workExperience
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };

  // Get public mentor profile
  getPublicProfile = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const mentorProfile = await prisma.mentorProfile.findFirst({
        where: {
          OR: [
            { id },
            { userId: id }
          ]
        },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true,
              profile: {
                select: {
                  headline: true,
                  bio: true,
                  country: true,
                  city: true
                }
              }
            }
          },
          education: true,
          workExperience: {
            orderBy: { startDate: 'desc' }
          },
          businesses: true
        }
      });

      if (!mentorProfile) {
        return res.status(404).json({
          success: false,
          error: 'Mentor not found'
        });
      }

      res.json({
        success: true,
        data: this.transformProfile(mentorProfile)
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };

  // Search mentors
  searchMentors = async (req: Request, res: Response) => {
    try {
      const { expertise, industry, minRating, maxRate } = req.query;

      const where: any = {};

      if (expertise) {
        const expertiseList = Array.isArray(expertise) ? expertise : [expertise];
        where.OR = expertiseList.map((tag: any) => ({
            expertiseTags: { contains: tag }
        }));
      }

      if (industry) {
        const industryList = Array.isArray(industry) ? industry : [industry];
        const industryConditions = industryList.map((tag: any) => ({
            industryTags: { contains: tag }
        }));
        
        if (where.OR) {
            where.AND = [
                { OR: where.OR },
                { OR: industryConditions }
            ];
            delete where.OR;
        } else {
            where.OR = industryConditions;
        }
      }

      if (minRating) {
        where.averageRating = {
          gte: parseFloat(minRating as string)
        };
      }

      if (maxRate) {
        where.scheduledRate = {
          lte: parseFloat(maxRate as string)
        };
      }

      const mentors = await prisma.mentorProfile.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: true,
              profile: {
                select: {
                  headline: true,
                  city: true,
                  country: true
                }
              }
            }
          }
        },
        orderBy: {
          averageRating: 'desc'
        }
      });

      res.json({
        success: true,
        data: mentors.map(m => this.transformProfile(m))
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };
}
