import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

const generateJWTTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "1d",
    algorithm: "HS256",
  });

  res.cookie("jwt", token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
    domain: ".swapnadeep.com",
  });
};

export default generateJWTTokenAndSetCookie;
