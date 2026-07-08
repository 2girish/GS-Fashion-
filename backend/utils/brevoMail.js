import Brevo from "@getbrevo/brevo";

const apiInstance = new Brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export const sendBrevoMail = async ({
  to,
  subject,
  html,
}) => {
  try {
    await apiInstance.sendTransacEmail({
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
    });

    console.log("✅ Brevo email sent successfully");
  } catch (error) {
    console.error("Brevo Email Error:", error);
    throw error;
  }
};