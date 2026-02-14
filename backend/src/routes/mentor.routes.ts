import { Router } from 'express';
import { MentorController } from '../controllers/mentor.controller';
import { authenticate } from '../middleware/auth.middleware';
import { upload } from '../middleware/upload.middleware';

const router = Router();
const mentorController = new MentorController();

// Public routes
router.get('/search', mentorController.searchMentors);
router.get('/service-patterns', mentorController.getServicePatternInfo);
router.get('/:id', mentorController.getPublicProfile);

// Protected routes (require authentication)
router.get('/me/profile', authenticate, mentorController.getMyProfile);
router.put('/me/profile', authenticate, mentorController.upsertProfile);
router.post('/me/education', authenticate, mentorController.addEducation);
router.post('/me/experience', authenticate, mentorController.addWorkExperience);
router.post('/me/resume', authenticate, upload.single('resume'), mentorController.uploadResume);

// Service Patterns (Operational Patterns)
router.put('/me/service-patterns', authenticate, mentorController.updateServicePatterns);
router.post('/me/online-status', authenticate, mentorController.setOnlineStatus);

// Online Schedule (1-4 weeks planning for instant mentorship)
router.get('/me/online-schedules', authenticate, mentorController.getOnlineSchedules);
router.post('/me/online-schedules', authenticate, mentorController.createOnlineSchedule);
router.delete('/me/online-schedules/:scheduleId', authenticate, mentorController.deleteOnlineSchedule);

export { router as mentorRoutes };
