import { Router } from 'express';

const router = Router();

// TODO: Add user controller and routes
router.get('/profile', (req, res) => {
  res.json({ message: 'Get user profile' });
});

router.put('/profile', (req, res) => {
  res.json({ message: 'Update user profile' });
});

router.get('/notifications', (req, res) => {
  res.json({ message: 'Get user notifications' });
});

export { router as userRoutes };
