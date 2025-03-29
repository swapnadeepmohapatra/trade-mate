import express from "express";
import {
  getUser,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";
import {
  googleCallback,
  googleRedirect,
} from "../controllers/google.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/user", getUser);

router.get("/google/callback", googleCallback);

router.get("/google", googleRedirect);

export default router;
