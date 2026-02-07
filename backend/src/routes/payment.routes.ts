import { Router } from 'express';

const router = Router();

// TODO: Add payment controller and routes
router.post('/create-intent', (req, res) => {
  res.json({ message: 'Create payment intent' });
});

router.post('/webhook', (req, res) => {
  res.json({ message: 'Stripe webhook' });
});

router.get('/history', (req, res) => {
  res.json({ message: 'Get payment history' });
});

router.post('/credits/redeem', (req, res) => {
  res.json({ message: 'Redeem credits' });
});

export { router as paymentRoutes };
