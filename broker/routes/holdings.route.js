import express from "express";
import { getHoldings } from "../controllers/holdings.controller.js";

const router = express.Router();

router.get("/", getHoldings);

export default router;
