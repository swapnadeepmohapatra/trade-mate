import express from "express";
import authRouter from "./routes/auth.route.js";
import sessionRouter from "./routes/session.route.js";
import { authMiddleware, prismaMiddleware } from "./middleware/index.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", prismaMiddleware, authMiddleware, authRouter);

app.use("/session", prismaMiddleware, authMiddleware, sessionRouter);

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
