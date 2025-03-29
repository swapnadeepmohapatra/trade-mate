import express from "express";
import stockDataRouter from "./routes/fin-data.route.js";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many requests, please try again later.",
  },
});

app.use(limiter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/fin-data", stockDataRouter);

const PORT = process.env.PORT || 4004;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
