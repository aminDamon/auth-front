// Email service configuration
const nodemailer = require('nodemailer');

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Function to send password reset email
async function sendPasswordResetEmail(email, resetToken) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;
  
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'بازیابی رمز عبور',
    html: `
      <div style="font-family: Tahoma; direction: rtl; text-align: right;">
        <h2>بازیابی رمز عبور</h2>
        <p>برای بازیابی رمز عبور خود روی لینک زیر کلیک کنید:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #f59e0b; color: white; text-decoration: none; border-radius: 5px;">
          بازیابی رمز عبور
        </a>
        <p>این لینک تا 1 ساعت معتبر است.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

module.exports = {
  sendPasswordResetEmail
}; 