import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { Worker } from "bullmq";
import Email from "../model/email.js";
import transporter, { canSend } from "../utils/util.js";

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Worker MongoDB connected"))
  .catch((err) => console.error("Worker MongoDB error", err));

async function callWorker(job) {
  console.log("Worker received job:", job.id, job.data);

  const { emailId } = job.data;
  const email = await Email.findById(emailId);

  if (!email || email.status === "sent") return;

  const allowed = await canSend(email.sender);

  if (!allowed) {
    console.log("Rate limit reached for", email.sender, "- retrying later");
    throw new Error("RATE_LIMIT");
  }

  console.log("Sending email to:", email.to);

  await transporter.sendMail({
    from: email.sender,
    to: email.to,
    subject: email.subject,
    text: email.body,
  });

  email.status = "sent";
  email.sentAt = new Date();
  await email.save();

  console.log("Email sent successfully:", email.to, job.id);
}

new Worker("emails", callWorker,   {
    connection: {
      url: process.env.REDIS_URL,
      tls: {
        rejectUnauthorized: false
      }
    },
    concurrency: 5
  });
