import { Router } from 'express';

const router = Router();

// TODO: Add project controller and routes
router.get('/', (req, res) => {
  res.json({ message: 'Get projects' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create project' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'Get project details' });
});

router.put('/:id', (req, res) => {
  res.json({ message: 'Update project' });
});

router.post('/:id/phases', (req, res) => {
  res.json({ message: 'Add project phase' });
});

router.post('/:id/objectives', (req, res) => {
  res.json({ message: 'Add phase objective' });
});

export { router as projectRoutes };
