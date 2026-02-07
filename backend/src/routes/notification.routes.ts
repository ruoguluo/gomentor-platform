import { Router } from 'express';

const router = Router();

// TODO: Add notification controller and routes
router.get('/', (req, res) => {
  res.json({ message: 'Get notifications' });
});

router.post('/:id/read', (req, res) => {
  res.json({ message: 'Mark notification as read' });
});

router.post('/read-all', (req, res) => {
  res.json({ message: 'Mark all notifications as read' });
});

router.delete('/:id', (req, res) => {
  res.json({ message: 'Delete notification' });
});

export { router as notificationRoutes };
