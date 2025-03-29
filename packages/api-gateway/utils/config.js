import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 8080;

export const publicRoutes = {
  "/api/auth/login": "http://localhost:4001/auth/login",
  "/api/auth/logout": "http://localhost:4001/auth/logout",
  "/api/auth/signup": "http://localhost:4001/auth/signup",
  "/api/auth/google/callback": "http://localhost:4001/auth/google/callback",
  "/api/auth/google": "http://localhost:4001/auth/google",
  "/api/news": "http://localhost:4003/news",
  "/api/market-data": "http://localhost:4000/market-data",
  "/api/artha-gyan": "http://localhost:4004/fin-data",
  "/api/nivesh-gyaan": "http://localhost:4005/ai-data",
};

export const privateRoutes = {
  "/api/auth/user": "http://localhost:4001/auth/user",
  "/api/session": "http://localhost:4002/session",
  "/api/holdings": "http://localhost:4002/holdings",
  "/api/brokers": "http://localhost:4002/brokers",
  "/api/margin": "http://localhost:4002/margin",
};

export const JWT_SECRET = process.env.JWT_SECRET;
