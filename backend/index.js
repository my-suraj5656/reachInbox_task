import dotenv from "dotenv";
dotenv.config();
import express from "express";
import "./worker/worker.js";
import conn from "./conn/conn.js";
import cors from "cors";
import scheduleRoutes from "./route/scheduleRoute.js";
import emailRoutes from "./route/emailRoute.js";

const PORT = process.env.PORT || 3020;
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",           
      "https://reachinbox-task.vercel.app", 
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());

// schedule
app.use("/api/schedule", scheduleRoutes);

// email
app.use("/api/emails", emailRoutes);

conn().then(() => {
  app.listen(PORT, () => console.log(`Server running at PORT ${PORT}`));
});
