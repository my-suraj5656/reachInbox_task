import { Queue } from "bullmq";
import dotenv from "dotenv";

dotenv.config();

export const emailQueue = new Queue("emails", {
  connection: {
    url: process.env.REDIS_URL,
    tls: {
      rejectUnauthorized: false
    }
  }
});
