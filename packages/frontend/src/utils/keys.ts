export const BACKEND_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/api"
    : "https://api.trademate.swapnadeep.com/api";
