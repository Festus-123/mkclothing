// Admin Controller
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // hashed or plain for now

  console.log(req.body); // Debugging line to check env variables
  console.log(`Admin Email: ${ADMIN_EMAIL}, Admin Password: ${ADMIN_PASSWORD}`); // Debugging line to check env variables
  // console.log(process.env.ADMIN_EMAIL)
  if (email === process.env.ADMIN_EMAIL) {
    console.log(true);
  }
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.json({ token });
};
