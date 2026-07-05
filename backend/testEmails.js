import dotenv from "dotenv";
import transporter from "./config/mail.js";

dotenv.config();

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Missing");

try {
  console.log("Verifying SMTP connection...");

  await transporter.verify();

  console.log("✅ SMTP Connected Successfully!");

  const info = await transporter.sendMail({
    from: `"GS Fashion" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: "GS Fashion Test Email",
    text: "This is a test email from GS Fashion.",
  });

  console.log("✅ Email sent successfully!");
  console.log(info);
} catch (error) {
  console.error("❌ SMTP Error:");
  console.error(error);
}