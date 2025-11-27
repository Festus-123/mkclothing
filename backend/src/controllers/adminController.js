// Admin Controller
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { sendEmail } from '../utils/emailServices.js';
import Admin from '../models/Admin.js';

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Admin Sign up
export const signUpAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = await Admin.create({ name, email, password });

    res.send({
      message: 'Admin registered successfully',
      token: generateToken(admin._id),
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.log("server error", error)
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Email message
    const loginMessage = `
      <h2>Login Alert</h2>
      <p>Hello ${admin.name},</p>
      <p>You just logged into your Admin Dashboard.</p>
      <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      <p><strong>IP:</strong> ${req.ip}</p>
      <p>If this wasn't you, please secure your account immediately.</p>
    `;

    await sendEmail(admin.email, 'Admin Login Alert', loginMessage);

    res.json({
      message: 'Login successful',
      token: generateToken(admin._id),
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
