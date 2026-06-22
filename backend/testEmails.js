import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load .env
dotenv.config();

// Debug check
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Missing");

async function sendTestEmail() {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: `"Test" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "Test Email",
      text: "This is a test email from GS Fashion backend",
    });

    console.log("✅ Test email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Test email failed:", error);
  }
}

sendTestEmail();

