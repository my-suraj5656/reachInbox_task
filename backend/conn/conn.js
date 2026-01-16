import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config()

const conn = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log("Database error", error);
    }
}

export default conn