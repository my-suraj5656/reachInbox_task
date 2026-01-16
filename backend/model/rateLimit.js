import mongoose from "mongoose";

const RateLimitSchema = new mongoose.Schema({
  sender: String,
  hour: String, 
  count: {
    type: Number,
    default: 0
  }
});

export default mongoose.model("RateLimit", RateLimitSchema);
