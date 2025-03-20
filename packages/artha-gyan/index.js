import express from "express";
import marketDataRouter from "./routes/fin-data.route.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/fin-data", marketDataRouter);

const PORT = process.env.PORT || 4003;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
