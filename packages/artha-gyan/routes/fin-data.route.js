import express from "express";
import { getFinData } from "../controllers/ticker-data.controller.js";

const router = express.Router();

router.get("/:ticker", getFinData);

export default router;
