import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import router from './routes/adminRoutes.js';
import productRoutes from './routes/ProductRoutes.js';
import logRoutes from './routes/logsRoutes.js'

const app = express();

const PORT = process.env.PORT || 5000;

connectDB();


app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// middle ware
app.use(express.json());
app.use(cookieParser());
app.use('/api/admin', router);


app.use('/api/admin/products', productRoutes)
app.use('/api/admin/logs', logRoutes)




// listening to server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
