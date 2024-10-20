import React, { useEffect, useState } from "react";
import { getNewsList } from "../../../services/news";
import NewsItem from "./newsItem";
import { Box, Grid } from "@chakra-ui/react";

const news = {
  title: "Asian IPOs set for blockbuster week as ‘Animal Spirits’ return",
  description:
    "Asia's stock markets are about to witness the busiest week of public offerings in over two years. Around 20 companies will list shares, aiming to raise $8.3 billion. Companies from China, India, and Japan are among the major participants.",
  image:
    "https://img.etimg.com/thumb/msid-114388871,width-1200,height-630,imgsize-43128,overlay-etmarkets/articleshow.jpg",
  publishedAt: "2024-10-20 03:34:09",
  source: "The Economic Times",
  url: "https://economictimes.indiatimes.com/markets/ipos/fpos/asian-ipos-set-for-blockbuster-week-as-animal-spirits-return/articleshow/114388435.cms",
};

function NewsList() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    getNewsList().then((data) => {
      setNews(data.data);
    });
  }, []);

  return (
    <Box padding={4}>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={6}
      >
        {news.length > 0
          ? news.map((newsItem, index) => (
              <NewsItem key={index} news={newsItem} />
            ))
          : null}
      </Grid>
    </Box>
  );
}

export default NewsList;
