import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

export const decode = (token) => jwt.verify(token.split("=")[1], JWT_SECRET);
