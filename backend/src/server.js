import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: 'http://localhost:5175',
    credentials: true,
  })
);

// middle ware
app.use(express.json());
app.use(cookieParser());

// listening to server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
