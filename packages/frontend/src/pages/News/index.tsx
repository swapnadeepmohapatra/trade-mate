import { Divider, Stack } from "@chakra-ui/react";
import React from "react";
import Navbar from "./components/navbar";
import NewsList from "./components/news";

function News() {
  return (
    <Stack>
      <Navbar />
      <Divider />
      <NewsList />
    </Stack>
  );
}

export default News;
