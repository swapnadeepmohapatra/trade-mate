import express from "express";
import { getBrokers } from "../controllers/brokers.controller.js";

const router = express.Router();

router.get("/", getBrokers);

export default router;
