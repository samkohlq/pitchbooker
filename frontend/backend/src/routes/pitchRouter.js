import express from "express";
import { createPitch, retrievePitches } from "../controllers/pitchController";

const router = express.Router();

// create pitch
router.post("/createPitch", (req, res) => createPitch(req, res));
router.get("/retrievePitches", (req, res) => retrievePitches(req, res));

export default router;
