import React from "react";
import { Divider, Stack } from "@chakra-ui/react";
import LinkBroker from "./components/LinkBroker";
import Navbar from "../../components/Navbar";

function Home() {
  return (
    <Stack>
      <Navbar />
      <Divider />
      <LinkBroker />
    </Stack>
  );
}

export default Home;
