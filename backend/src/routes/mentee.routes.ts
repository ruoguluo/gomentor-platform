import { Router } from 'express';

const router = Router();

// TODO: Add mentee controller and routes
router.get('/dashboard', (req, res) => {
  res.json({ message: 'Get mentee dashboard' });
});

router.post('/question-plan', (req, res) => {
  res.json({ message: 'Create question plan' });
});

router.get('/question-plans', (req, res) => {
  res.json({ message: 'Get question plans' });
});

router.get('/matches', (req, res) => {
  res.json({ message: 'Get AI mentor matches' });
});

export { router as menteeRoutes };
