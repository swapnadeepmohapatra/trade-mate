import express from "express";
import { getMargin } from "../controllers/margin.contoller.js";

const router = express.Router();

router.get("/", getMargin);

export default router;
