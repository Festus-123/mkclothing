import express from 'express';
import { signUpAdmin, loginAdmin } from '../controllers/adminController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();



// admin sign up
router.post('/signup', () => {
  res.setHeader('Content-Type', 'application/json');
  res.status(503).json({ message: 'Sign up is currently disabled' });
});

// admin log in
router.post('/login', loginAdmin);

// admin dash board
router.get('/dashboard', protect, (req, res) => {
  res.json({ message: `Welcome admin ${req.user.email}` });
});

export default router;
