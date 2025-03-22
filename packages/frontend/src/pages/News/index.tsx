import { Divider, Stack } from "@chakra-ui/react";

import NewsList from "./components/news";
import Navbar from "../../components/Navbar";

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
