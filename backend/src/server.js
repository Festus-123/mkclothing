import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './config/db.js';
import User from './models/User.js';

const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

// middle ware
app.use(express.json());

// routes
// import useRoutes from './routes/userRoutes.js';
// app.use('/api/products', useRoutes );

app.get('/test', async (req, res) => {
  try {
    const user = new User({
      id: 1,
      name: 'John Doe',
      email: 'test@gmail.com',
      password: '1234',
    });
    await user.save();
    res.send('Test route working');
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// listening to server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
