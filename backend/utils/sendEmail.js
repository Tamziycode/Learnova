const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (toEmail, username, token) => {
  const verifyUrl = `${process.env.BACKEND_URL}/api/auth/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"Learnova" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Verify your Learnova account",
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; background: #0d1117; color: #e6edf3; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #7c6aff, #2dd4bf); padding: 32px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px; color: white; letter-spacing: -0.5px;">Learnova</h1>
          <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 14px;">Learn Without Limits</p>
        </div>
        <div style="padding: 32px;">
          <h2 style="font-size: 20px; font-weight: 700; margin: 0 0 12px;">Verify your email address</h2>
          <p style="color: #8b949e; font-size: 14px; line-height: 1.6; margin: 0 0 24px;">
            Hi ${username}, thanks for signing up. Click the button below to verify your email address and activate your account.
          </p>
          <a href="${verifyUrl}" style="display: inline-block; background: linear-gradient(135deg, #7c6aff, #2dd4bf); color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 700; font-size: 15px;">
            Verify Email Address
          </a>
          <p style="color: #484f58; font-size: 12px; margin: 24px 0 0; line-height: 1.6;">
            This link expires in 24 hours. If you did not create an account, you can safely ignore this email.
          </p>
        </div>
      </div>
    `,
  });
};

module.exports = { sendVerificationEmail };
