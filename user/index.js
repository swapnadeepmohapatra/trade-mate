import express from "express";
import authRouter from "./routes/auth.route.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(
  "/auth",
  (req, res, next) => {
    req.prisma = prisma;
    next();
  },
  authRouter
);

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
