import mongoose from "mongoose";

const EmailSchema = new mongoose.Schema(
  {
    to: String,
    subject: String,
    body: String,

    scheduledAt: Date,
    sentAt: Date,

    status: {
      type: String,
      enum: ["scheduled", "sent", "failed"],
      default: "scheduled",
    },
    sender: String,
  },
  { timestamps: true }
);

export default mongoose.model("Email", EmailSchema);
