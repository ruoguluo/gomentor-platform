import { Router } from 'express';

const router = Router();

// TODO: Add mentor controller and routes
router.get('/', (req, res) => {
  res.json({ message: 'Search mentors' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'Get mentor profile' });
});

router.put('/profile', (req, res) => {
  res.json({ message: 'Update mentor profile' });
});

router.post('/availability', (req, res) => {
  res.json({ message: 'Set mentor availability' });
});

router.get('/:id/sessions', (req, res) => {
  res.json({ message: 'Get mentor sessions' });
});

export { router as mentorRoutes };
