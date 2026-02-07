import { Router } from 'express';

const router = Router();

// TODO: Add session controller and routes
router.get('/', (req, res) => {
  res.json({ message: 'Get sessions' });
});

router.post('/instant', (req, res) => {
  res.json({ message: 'Create instant session' });
});

router.post('/scheduled', (req, res) => {
  res.json({ message: 'Create scheduled session' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'Get session details' });
});

router.post('/:id/join', (req, res) => {
  res.json({ message: 'Join session' });
});

router.post('/:id/feedback', (req, res) => {
  res.json({ message: 'Submit session feedback' });
});

export { router as sessionRoutes };
