import { Router } from 'express';
import { MentorController } from '../controllers/mentor.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
const mentorController = new MentorController();

// Public routes
router.get('/search', mentorController.searchMentors);
router.get('/:id', mentorController.getPublicProfile);

// Protected routes (require authentication)
router.get('/me/profile', authenticate, mentorController.getMyProfile);
router.put('/me/profile', authenticate, mentorController.upsertProfile);
router.post('/me/education', authenticate, mentorController.addEducation);
router.post('/me/experience', authenticate, mentorController.addWorkExperience);

export { router as mentorRoutes };
