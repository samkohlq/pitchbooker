import express from "express";
import {
  createPitch,
  deletePitch,
  retrievePitches,
  updatePitch
} from "../controllers/pitchController";

const router = express.Router();

// create pitch
router.post("/createPitch", (req, res) => createPitch(req, res));
router.get("/retrievePitches", (req, res) => retrievePitches(req, res));
router.delete("/deletePitch", (req, res) => deletePitch(req, res));
router.put("/updatePitch", (req, res) => updatePitch(req, res));

export default router;
