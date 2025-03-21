import express from "express";
import stockDataRouter from "./routes/fin-data.route.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/fin-data", stockDataRouter);

const PORT = process.env.PORT || 4004;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
