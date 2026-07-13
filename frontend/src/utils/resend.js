import { Resend } from 'resend';

// Initialize with your API key from the Resend Dashboard
// import process from 'process';
const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

export const sendOrderConfirmation = async (customerEmail, orderDetails) => {
  try {
    const data = await resend.emails.send({
      from: 'st.festus4cruise@gmail.com', // Requires domain verification
      to: [customerEmail],
      subject: `Order Confirmed! Receipt #${orderDetails.id}`,
      html: `
        <h1>Thank you for your order!</h1>
        <p>We are processing your items. Total paid: ₦${orderDetails.total_price}</p>
      `,
    });
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

// utils/resend.js


// export const sendOrderConfirmation = async (email, orderData) => {
//   const apiKey = import.meta.env.VITE_RESEND_API_KEY; // Ensure this is in your .env file
  
//   const customOrderId = `MK-${orderData.id.slice(0, 5).toUpperCase()}`;

//   const response = await fetch('https://api.resend.com/emails', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${apiKey}`,
//     },
//     body: JSON.stringify({
//       from: 'M&K Clothing <onboarding@resend.dev>',
//       to: email, // REMINDER: During onboarding, this MUST be your st.festus4cruise@gmail.com email
//       subject: `Order Confirmation ${customOrderId}`,
//       html: `
//         <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
//           <h2 style="color: #8b4a1f; border-bottom: 2px solid #8b4a1f; padding-bottom: 10px;">
//             Thank you for your order!
//           </h2>
//           <p>Your order tracking reference is <strong>${customOrderId}</strong>.</p>
//           <p>Total amount: $${orderData.total_price}</p>
//         </div>
//       `,
//     }),
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || 'Failed to transmit via Resend REST API');
//   }

//   return await response.json();
// };
