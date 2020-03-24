import express from "express";
import { sendBookingConfirmationEmail } from "../controllers/emailController";

const router = express.Router();

router.post("/sendBookingConfirmationEmail", (req, res) =>
  sendBookingConfirmationEmail(req, res)
);

export default router;
