import { useEffect, useState } from "react";
import { getNewsList } from "../../../services/news";
import NewsItem from "./newsItem";
import { Box, Flex, Grid, Spinner, Text } from "@chakra-ui/react";

function NewsList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getNewsList()
      .then((data) => {
        setLoading(false);
        setNews(data.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  if (loading) {
    return (
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        height={"calc(100vh - 8rem)"}
        width={"100%"}
        flexDirection={"column"}
      >
        <Spinner />
        <Text marginTop={6} textAlign={"center"}>
          Please wait... We are gathering all the latest news for you{" "}
        </Text>
      </Flex>
    );
  }

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
