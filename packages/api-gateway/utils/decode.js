import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

export const decode = (token) => {
  const jwtCookie = token
    .split("; ")
    .find((cookie) => cookie.startsWith("jwt="));

  if (!jwtCookie) {
    throw new Error("JWT cookie not found");
  }

  const jwtToken = jwtCookie.split("=")[1];

  try {
    const decoded = jwt.verify(jwtToken, JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    throw error;
  }
};
