import React from "react";
import { Divider, Stack } from "@chakra-ui/react";
import LinkBroker from "./components/LinkBroker";
import Navbar from "../../components/Navbar";
import WatchList from "./components/WatchList";

function Home() {
  return (
    <Stack>
      <Navbar />
      <Divider />
      <WatchList />
      <LinkBroker />
    </Stack>
  );
}

export default Home;
