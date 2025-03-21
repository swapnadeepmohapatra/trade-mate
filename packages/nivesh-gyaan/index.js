import express from "express";
import aiDataRouter from "./routes/ai-data.route.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/ai-data", aiDataRouter);

const PORT = process.env.PORT || 4005;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
