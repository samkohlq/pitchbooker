import express from "express";
import {
  createProvider,
  retrieveProviders
} from "../controllers/providerController";

const router = express.Router();

// create provider
router.post("/createProvider", (req, res) => createProvider(req, res));
router.get("/retrieveProviders", (req, res) => retrieveProviders(req, res));

export default router;
