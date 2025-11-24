import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './config/db.js';
import router from './routes/adminRoutes.js';

const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

// middle ware
app.use(express.json());

app.use('/api/admin', router);

// // Handle unmatched routes
// app.all('*', (req, res) => {
//   console.log('Unmatched request:', req.method, req.path);
//   res.status(404).send('Route not found');
// });

// listening to server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


export default app;
