import express from "express";
import {
  createProvider,
  retrieveProvider
} from "../controllers/providerController";

const router = express.Router();

// create provider
router.post("/createProvider", (req, res) => createProvider(req, res));
router.get("/retrieveProvider", (req, res) => retrieveProvider(req, res));

export default router;
