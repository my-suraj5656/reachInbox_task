import express from "express";
import emailController from "../controller/email.js";
const router = express.Router();

// get schedule
router.get("/scheduled",  emailController.getSchedule)


// get all sent schedule
router.get("/sent",  emailController.getAllSent)


export default router;
