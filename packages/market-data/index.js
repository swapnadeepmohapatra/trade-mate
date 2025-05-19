import express from "express";
import marketDataRouter from "./routes/market-data.route.js";
import { prismaMiddleware } from "./middleware/index.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/market-data", prismaMiddleware, marketDataRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
