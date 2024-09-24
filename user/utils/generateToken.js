import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

const generateJWTTokenAndSetCookie = (userId, salt, res) => {
  const token = jwt.sign({ userId }, `${JWT_SECRET}${salt}`, {
    expiresIn: "1d",
    algorithm: "HS256",
  });

  res.cookie("jwt", token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: false,
  });
};

export default generateJWTTokenAndSetCookie;
