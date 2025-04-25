import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const testEmail = async () => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: "test@example.com", // Replace with a valid email address for testing
      subject: "Test Email from TrendByte",
      text: "This is a test email to verify the nodemailer configuration.",
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Test email sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending test email:", error);
  }
};

testEmail();
