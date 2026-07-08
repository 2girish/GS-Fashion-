import axios from "axios";

export const sendBrevoMail = async ({ to, subject, html }) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "GS Fashion",
          email: process.env.EMAIL_FROM,
        },
        to: [
          {
            email: to,
          },
        ],
        subject,
        htmlContent: html,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Brevo email sent:", response.data);
  } catch (error) {
    console.error(
      "Brevo API Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};