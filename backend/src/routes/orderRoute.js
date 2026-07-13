import express from 'express';
import { handleOrderEmail } from '../controller/orderController.js';

const router = express.Router();

// Define the route endpoint
router.post('/send-confirmation', handleOrderEmail);

export default router;