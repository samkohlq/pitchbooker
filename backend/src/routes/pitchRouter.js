import express from "express";
import {
  createPitch,
  deletePitch,
  retrievePitches
} from "../controllers/pitchController";

const router = express.Router();

// create pitch
router.post("/createPitch", (req, res) => createPitch(req, res));
router.get("/retrievePitches", (req, res) => retrievePitches(req, res));
router.get("/deletePitch", (req, res) => deletePitch(req, res));

export default router;
