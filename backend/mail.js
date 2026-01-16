import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function sendTestMail() {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: process.env.ETHEREAL_USER,
      pass: process.env.ETHEREAL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.DEFAULT_SENDER,
    to: "surajprasad5656@gmail.com", // can be any email (Ethereal will NOT actually send)
    subject: "Ethereal Test",
    text: "Hello from ReachInbox Scheduler",
  });

  console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
}

sendTestMail().catch(console.error);
