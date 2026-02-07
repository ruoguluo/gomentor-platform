import { Router } from 'express';

const router = Router();

// TODO: Add admin controller and routes

// Dashboard
router.get('/dashboard', (req, res) => {
  res.json({ message: 'Admin dashboard stats' });
});

// User Management
router.get('/users', (req, res) => {
  res.json({ message: 'Get all users' });
});

router.get('/users/:id', (req, res) => {
  res.json({ message: 'Get user details' });
});

router.put('/users/:id/status', (req, res) => {
  res.json({ message: 'Update user status' });
});

// Mentor Verification
router.get('/verification/pending', (req, res) => {
  res.json({ message: 'Get pending verifications' });
});

router.post('/verification/:id/approve', (req, res) => {
  res.json({ message: 'Approve mentor verification' });
});

router.post('/verification/:id/reject', (req, res) => {
  res.json({ message: 'Reject mentor verification' });
});

// Compliance
router.get('/compliance/alerts', (req, res) => {
  res.json({ message: 'Get compliance alerts' });
});

router.get('/compliance/sessions/:id/transcript', (req, res) => {
  res.json({ message: 'Get session transcript' });
});

router.post('/compliance/alerts/:id/resolve', (req, res) => {
  res.json({ message: 'Resolve compliance alert' });
});

// Project Management
router.get('/projects', (req, res) => {
  res.json({ message: 'Get all projects' });
});

router.get('/projects/:id', (req, res) => {
  res.json({ message: 'Get project details' });
});

// Finance
router.get('/finance/overview', (req, res) => {
  res.json({ message: 'Get financial overview' });
});

router.get('/finance/payouts', (req, res) => {
  res.json({ message: 'Get pending payouts' });
});

export { router as adminRoutes };
