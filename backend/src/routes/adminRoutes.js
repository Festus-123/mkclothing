import express from 'express';
import { signUpAdmin, loginAdmin } from '../controllers/adminController.js';
import protect from '../middlewares/authMiddleware.js';
import { getAnalytics } from '../controllers/analyticsController.js';

const router = express.Router();

// admin sign up
router.post('/signup', (req, res) => {
  console.log('Signup disabled');
  res.status(503).json({ message: 'Sign up is currently disabled' });
});

// admin log in
router.post('/login', loginAdmin);

// admin dash board
router.get('/dashboard', protect, (req, res) => {
  res.json({ message: `Welcome admin ${req.user.email}` });
});

router.get('/analytics', protect, getAnalytics)

export default router;
