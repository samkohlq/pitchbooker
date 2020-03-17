import express from "express";
import {
  createBooking,
  retrieveBookings
} from "../controllers/bookingController";

const router = express.Router();

// create pitch
router.post("/createBooking", (req, res) => createBooking(req, res));
router.get("/retrieveBookings", (req, res) => retrieveBookings(req, res));

export default router;
