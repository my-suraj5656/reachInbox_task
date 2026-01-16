import dotenv from "dotenv";
dotenv.config();
import { emailQueue } from "../conn/queue.js";
import Email from "../model/email.js";

const scheduleController = {
  // post schedule
  async scheduleCreate(req, res) {
    try {
      // console.log(true);

      const { emails, subject, body, startTime, delayBetween } = req.body;

      const base = startTime ? new Date(startTime) : new Date();

      for (let i = 0; i < emails.length; i++) {
        const scheduledAt = new Date(base.getTime() + i * delayBetween * 1000);

        const email = await Email.create({
          to: emails[i],
          subject,
          body,
          scheduledAt,
          sender: process.env.DEFAULT_SENDER,
        });

        const delay = scheduledAt.getTime() - Date.now();

        await emailQueue.add(
          "send-email",
          {
            emailId: email._id,
          },
          { delay,
            attempts: 5,
            backoff: {
                type: "fixed",
                delay: 60*60*1000
            }
           }
        );
      }

      return res
        .status(201)
        .json({ message: "Emails scheduled successfully", success: true });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  },
};

export default scheduleController;
