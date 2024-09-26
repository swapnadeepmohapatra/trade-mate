import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 8080;

export const publicRoutes = {
  "/api/auth": "http://localhost:4001/auth",
};

export const privateRoutes = {
  "/api/market-data": "http://localhost:4000",
};

export const JWT_SECRET = process.env.JWT_SECRET;
