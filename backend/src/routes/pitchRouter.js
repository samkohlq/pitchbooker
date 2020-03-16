import express from "express";
import { createPitch } from "../controllers/pitchController";

const router = express.Router();

// create pitch
router.post("/createPitch", (req, res) => createPitch(req, res));

export default router;
