import express from "express";
import scheduleController from "../controller/schedule.js";
const router = express.Router();

// post schedule
router.post("/createschedule",  scheduleController.scheduleCreate)


export default router;
