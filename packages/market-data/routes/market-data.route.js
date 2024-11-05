import express from "express";
import { getMarketData } from "../controllers/market-data.controller.js";

const router = express.Router();

router.get("/", getMarketData);

export default router;
