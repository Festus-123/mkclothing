import { sendOrderConfirmationEmail } from '../services/resend.js';

export const handleOrderEmail = async (req, res) => {
  const { email, customerName, customOrderId, totalPrice } = req.body;

  // Basic validation guard
  if (!email || !customerName || !customOrderId || !totalPrice) {
    return res.status(400).json({ 
      success: false, 
      error: 'Missing required checkout parameters.' 
    });
  }

  // Execute your Resend service module
  const result = await sendOrderConfirmationEmail({
    customerEmail: email,
    customerName: customerName,
    orderId: customOrderId,
    totalAmount: totalPrice,
  });

  if (result.success) {
    return res.status(200).json({ 
      success: true, 
      message: 'Order email successfully processed.', 
      data: result.data 
    });
  } else {
    return res.status(500).json({ 
      success: false, 
      error: result.error 
    });
  }
};