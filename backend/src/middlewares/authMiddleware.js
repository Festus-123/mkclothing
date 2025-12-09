// admin middleware to protect routes
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const protect = async (req, res, next) => {

  let token;

  if (req.cookies && req.cookies.adminToken) {
    token = req.cookies.adminToken;
  }

  if(!token){
    console.log('No token found');
    return res.status(401).json({ message: 'Not authorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    req.user = admin;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized' });
  }
};

export default protect;
