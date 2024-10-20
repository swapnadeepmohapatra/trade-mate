import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/news", async (req, res) => {
  const data = await fetch(
    `https://newsdata.io/api/1/latest?apikey=${process.env.API_KEY}&category=business&country=in&language=en`
  );
  const result = await data.json();

  res.json({
    status: "success",
    message: "News fetched successfully",
    data: result.results
      .map((news) => ({
        title: news.title,
        description: news.description,
        image: news.image_url,
        publishedAt: news.pubDate,
        source: news.source_name,
        url: news.link,
      }))
      .filter((news) => news.image !== null),
  });
});

const PORT = process.env.PORT || 4003;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
