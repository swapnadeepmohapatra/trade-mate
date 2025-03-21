import express from "express";
import { getAiData } from "../controllers/ai-data.controller.js";

const router = express.Router();

router.get("/:ticker", getAiData);

export default router;
