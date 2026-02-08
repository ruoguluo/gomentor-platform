import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

export class MentorController {
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
        data: mentorProfile
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
        data: mentorProfile
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
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
        data: mentorProfile
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
        where.expertiseTags = {
          hasSome: Array.isArray(expertise) ? expertise : [expertise]
        };
      }

      if (industry) {
        where.industryTags = {
          hasSome: Array.isArray(industry) ? industry : [industry]
        };
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
        data: mentors
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };
}
