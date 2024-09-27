import express from "express";
import {
  getAccessToken,
  getOAuthLink,
} from "../controllers/session.controller.js";

const router = express.Router();

router.post("/oauth", getOAuthLink);
router.post("/access-token", getAccessToken);

export default router;
