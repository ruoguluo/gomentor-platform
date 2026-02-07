import { Router } from 'express';

const router = Router();

// TODO: Add course controller and routes
router.get('/', (req, res) => {
  res.json({ message: 'Get courses' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create course' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'Get course details' });
});

router.post('/:id/enroll', (req, res) => {
  res.json({ message: 'Enroll in course' });
});

router.post('/:id/modules', (req, res) => {
  res.json({ message: 'Add course module' });
});

export { router as courseRoutes };
