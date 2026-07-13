import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// 1. Import your new order routes
import orderRoutes from './routes/orderRoute.js'; // Adjust this path if your folder structure differs

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173', // Matches your frontend development port
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// 2. Register your order routes
// This prefixes all endpoints inside orderRoutes with "/api/orders"
app.use('/api/orders', orderRoutes);

// Optional: Global health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend server is active' });
});

// Listening to server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;