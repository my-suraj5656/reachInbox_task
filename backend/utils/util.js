import nodemailer from "nodemailer";
import dotenv from "dotenv";
import RateLimit from "../model/rateLimit.js";

dotenv.config();

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

export default transporter;

// ratelimit
const MAX_PER_HOUR = process.env.MAX_PER_HOUR;

export async function canSend(sender) {
  const now = new Date();
  const hourKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${now.getHours()}`;

  const record = await RateLimit.findOneAndUpdate(
    { sender, hour: hourKey },
    { $inc: { count: 1 } },
    { upsert: true, new: true }
  );

  return record.count <= MAX_PER_HOUR;
}
