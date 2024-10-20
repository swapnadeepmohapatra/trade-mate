import React, { useEffect, useState } from "react";
import { getNewsList } from "../../../services/news";
import NewsItem from "./newsItem";
import { Box, Grid } from "@chakra-ui/react";

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
