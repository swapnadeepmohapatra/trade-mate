import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 8080;

export const publicRoutes = {
  "/api/auth/login": "http://localhost:4001/auth/login",
  "/api/auth/logout": "http://localhost:4001/auth/logout",
  "/api/auth/signup": "http://localhost:4001/auth/signup",
  "/api/news": "http://localhost:4003/news",
};

export const privateRoutes = {
  "/api/auth/user": "http://localhost:4001/auth/user",
  "/api/session": "http://localhost:4002/session",
  "/api/holdings": "http://localhost:4002/holdings",
  "/api/brokers": "http://localhost:4002/brokers",
  "/api/margin": "http://localhost:4002/margin",
  "/api/market-data": "http://localhost:4000/market-data",
};

export const JWT_SECRET = process.env.JWT_SECRET;
