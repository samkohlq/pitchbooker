import express from "express";
import {
  createPitch,
  retrieveOwnPitches
} from "../controllers/pitchController";

const router = express.Router();

// create pitch
router.post("/createPitch", (req, res) => createPitch(req, res));
router.get("/retrieveOwnPitches", (req, res) => retrieveOwnPitches(req, res));

export default router;
