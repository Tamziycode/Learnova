const { google } = require("googleapis");

const sendVerificationEmail = async (toEmail, username, token) => {
  const verifyUrl = `${process.env.BACKEND_URL}/api/auth/verify-email?token=${token}`;

  // 1. Initialize the OAuth2 Client
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground",
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

  // 2. Initialize the Gmail HTTP API
  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  // 3. Construct the raw email string (RFC 2822 format)
  const subject = "Verify your Learnova account";
  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString("base64")}?=`;

  const messageParts = [
    `From: Learnova <${process.env.EMAIL_USER}>`,
    `To: ${toEmail}`,
    `Subject: ${utf8Subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=utf-8",
    "",
    `
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
        </div>
      </div>
    `,
  ];

  const message = messageParts.join("\n");

  // 4. Google's API requires the payload to be Base64url encoded
  const encodedMessage = Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  // 5. Send via standard HTTP POST request (Bypasses Render SMTP Block)
  await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: encodedMessage,
    },
  });
};

module.exports = { sendVerificationEmail };
