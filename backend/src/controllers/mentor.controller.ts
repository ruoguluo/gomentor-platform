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
      const { expertise, industry, minRating, maxRate, servicePattern, isOnline } = req.query;

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

      // Filter by service pattern
      if (servicePattern) {
        where.servicePatterns = {
          contains: servicePattern as string
        };
      }

      // Filter by online status for instant mentorship
      if (isOnline === 'true') {
        where.isInstantAvailable = true;
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
        orderBy: [
          { isInstantAvailable: 'desc' }, // Online mentors first
          { averageRating: 'desc' }
        ]
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

  // ==================== SERVICE PATTERNS ====================

  // Update service patterns (operational patterns)
  updateServicePatterns = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id;
      const { 
        patterns, // ["instant", "scheduled", "workshop", "consulting"]
        instantSettings, // { isOnlineNow, weeklySchedule, rankBoost }
        consultingRate 
      } = req.body;

      // Validate patterns
      const validPatterns = ['instant', 'scheduled', 'workshop', 'consulting'];
      const validatedPatterns = patterns?.filter((p: string) => validPatterns.includes(p)) || [];

      // Validate instant settings if instant pattern is enabled
      let validatedInstantSettings = null;
      if (validatedPatterns.includes('instant') && instantSettings) {
        validatedInstantSettings = {
          isOnlineNow: instantSettings.isOnlineNow || false,
          weeklySchedule: instantSettings.weeklySchedule || [],
          rankBoost: instantSettings.rankBoost !== false // default true
        };
      }

      const mentorProfile = await prisma.mentorProfile.update({
        where: { userId },
        data: {
          servicePatterns: JSON.stringify(validatedPatterns),
          instantSettings: validatedInstantSettings ? JSON.stringify(validatedInstantSettings) : null,
          consultingRate: consultingRate ? parseFloat(consultingRate) : null,
          isInstantAvailable: validatedPatterns.includes('instant') && validatedInstantSettings?.isOnlineNow
        }
      });

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

  // Set online status for instant mentorship
  setOnlineStatus = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id;
      const { isOnline } = req.body;

      const mentorProfile = await prisma.mentorProfile.findUnique({
        where: { userId }
      });

      if (!mentorProfile) {
        return res.status(404).json({
          success: false,
          error: 'Mentor profile not found'
        });
      }

      // Check if instant pattern is enabled
      const patterns = this.parseTags(mentorProfile.servicePatterns);
      if (!patterns.includes('instant')) {
        return res.status(400).json({
          success: false,
          error: 'Instant mentorship pattern is not enabled. Please enable it first.'
        });
      }

      // Update instant settings
      const currentSettings = mentorProfile.instantSettings 
        ? JSON.parse(mentorProfile.instantSettings) 
        : {};
      
      const updatedSettings = {
        ...currentSettings,
        isOnlineNow: isOnline,
        lastStatusChange: new Date().toISOString()
      };

      const updatedProfile = await prisma.mentorProfile.update({
        where: { userId },
        data: {
          isInstantAvailable: isOnline,
          instantSettings: JSON.stringify(updatedSettings)
        }
      });

      res.json({
        success: true,
        data: {
          isOnline: updatedProfile.isInstantAvailable,
          settings: updatedSettings
        }
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };

  // Create online schedule for 1-4 weeks
  createOnlineSchedule = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id;
      const { weekStart, dailySlots } = req.body;

      const mentorProfile = await prisma.mentorProfile.findUnique({
        where: { userId }
      });

      if (!mentorProfile) {
        return res.status(404).json({
          success: false,
          error: 'Mentor profile not found'
        });
      }

      // Calculate week end (6 days after start)
      const startDate = new Date(weekStart);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6);

      // Validate daily slots
      const validatedSlots = dailySlots.map((slot: any) => ({
        day: slot.day, // 0-6 (Sunday-Saturday)
        startTime: slot.startTime, // "09:00"
        endTime: slot.endTime, // "17:00"
        isAvailable: slot.isAvailable !== false
      }));

      const schedule = await prisma.mentorOnlineSchedule.create({
        data: {
          mentorId: mentorProfile.id,
          weekStart: startDate,
          weekEnd: endDate,
          dailySlots: JSON.stringify(validatedSlots)
        }
      });

      res.status(201).json({
        success: true,
        data: schedule
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };

  // Get mentor's online schedules
  getOnlineSchedules = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id;
      const { weeksAhead = 4 } = req.query;

      const mentorProfile = await prisma.mentorProfile.findUnique({
        where: { userId }
      });

      if (!mentorProfile) {
        return res.status(404).json({
          success: false,
          error: 'Mentor profile not found'
        });
      }

      const now = new Date();
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + (parseInt(weeksAhead as string) * 7));

      const schedules = await prisma.mentorOnlineSchedule.findMany({
        where: {
          mentorId: mentorProfile.id,
          weekStart: {
            gte: now,
            lte: futureDate
          },
          isActive: true
        },
        orderBy: { weekStart: 'asc' }
      });

      res.json({
        success: true,
        data: schedules.map(s => ({
          ...s,
          dailySlots: JSON.parse(s.dailySlots)
        }))
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };

  // Delete online schedule
  deleteOnlineSchedule = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id;
      const { scheduleId } = req.params;

      const mentorProfile = await prisma.mentorProfile.findUnique({
        where: { userId }
      });

      if (!mentorProfile) {
        return res.status(404).json({
          success: false,
          error: 'Mentor profile not found'
        });
      }

      await prisma.mentorOnlineSchedule.update({
        where: { 
          id: scheduleId,
          mentorId: mentorProfile.id
        },
        data: { isActive: false }
      });

      res.json({
        success: true,
        message: 'Schedule deleted successfully'
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };

  // Get available service patterns info
  getServicePatternInfo = async (req: Request, res: Response) => {
    try {
      const patterns = [
        {
          id: 'instant',
          name: 'Instant Online Mentorship',
          description: 'Be available for immediate video/audio calls. Mentees can call you directly when you are online.',
          features: [
            'Go online anytime',
            'Set schedule 1-4 weeks in advance',
            'Rank higher in search results when online',
            'Get instant call notifications'
          ],
          requirements: ['Video/audio enabled', 'Reliable internet']
        },
        {
          id: 'scheduled',
          name: 'Scheduled Mentorship',
          description: 'Mentees book sessions in advance based on your available time slots.',
          features: [
            'Set your available time slots',
            'Review mentee applications',
            'Structured preparation with agenda',
            'Automatic calendar invites'
          ],
          requirements: ['Define your availability', 'Set your hourly rate']
        },
        {
          id: 'workshop',
          name: 'Workshop Speaker',
          description: 'Host group workshops on topics you are expert in.',
          features: [
            'Propose workshop topics',
            'Host live group sessions',
            'Earn from multiple attendees',
            'Build your brand'
          ],
          requirements: ['Workshop proposal approval', 'Group session capability']
        },
        {
          id: 'consulting',
          name: 'Freelancer Consultant',
          description: 'Offer project-based consulting services for complex engagements.',
          features: [
            'Project-based engagements',
            'Define deliverables and timeline',
            'Higher earning potential',
            'Long-term client relationships'
          ],
          requirements: ['Define consulting rates', 'Project management setup']
        }
      ];

      res.json({
        success: true,
        data: patterns
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };
}
