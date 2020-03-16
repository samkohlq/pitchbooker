import express from "express";
import { createProvider } from "../controllers/providerController";

const router = express.Router();

// create pitch
router.post("/createProvider", (req, res) => createProvider(req, res));

export default router;
