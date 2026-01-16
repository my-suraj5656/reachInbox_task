import Email from "../model/email.js";

const emailController = {
  // get scheduled
  async getSchedule(req, res) {
    try {
      const data = await Email.find({ status: "scheduled" });
      return res.status(200).json({
        message: "Fetched all scheduled successfully",
        success: true,
        data,
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  },

  // get all sent email
  async getAllSent(req, res) {
    try {
      const data = await Email.find({ status: "sent" });
      return res.status(200).json({
        message: "Fetched all sent email successfully",
        success: true,
        data,
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  },
};

export default emailController;
