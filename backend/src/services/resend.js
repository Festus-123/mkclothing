import { Resend } from 'resend';
// import process from 'process';

// Initializing the Resend instance with your secret key from your environment file (.env)

/**
 * Service utility to dispatch order confirmation emails
 * @param {Object} emailData - Order information payload from controller
 */
export const sendOrderConfirmationEmail = async ({
  customerEmail,
  customerName,
  orderId,
  totalAmount,
}) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  console.log(resend);

  try {
    const { data, error } = await resend.emails.send({
      from: 'M&K Clothing <onboarding@resend.dev>', // Update to your domain once verified in production!
      to: [customerEmail], // Target checkout user email address
      subject: `Order Confirmation - #${orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; color: #333; line-height: 1.6;">
          <h2 style="color: #111; border-bottom: 1px solid #eee; padding-bottom: 10px;">Thank you for your order!</h2>
          <p>Hi <strong>${customerName}</strong>,</p>
          <p>We've received your order and are currently processing it. Here are your transaction details:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; border: 1px solid #eee;"><strong>Order Reference:</strong></td>
              <td style="padding: 10px; border: 1px solid #eee;">#${orderId}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #eee;"><strong>Total Paid:</strong></td>
              <td style="padding: 10px; border: 1px solid #eee;">$${totalAmount}</td>
            </tr>
          </table>
          <p>If you have any questions regarding your items, feel free to reply directly to this mail.</p>
          <br />
          <p style="font-size: 13px; color: #888;">&copy; 2026 M&K Clothing Inc. All rights reserved.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend transaction validation failure:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Internal Resend Service execution error:', err.message);
    return { success: false, error: err.message };
  }
};
