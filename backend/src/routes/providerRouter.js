import express from "express";
import {
  createProvider,
  providerExists
} from "../controllers/providerController";

const router = express.Router();

// create provider
router.post("/createProvider", (req, res) => createProvider(req, res));
router.get("/providerExists", (req, res) => providerExists(req, res));

export default router;
