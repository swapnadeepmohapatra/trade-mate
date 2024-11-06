import { Divider, Stack } from "@chakra-ui/react";
import React from "react";
import Navbar from "../../components/Navbar";
import LinkBroker from "../Home/components/LinkBroker";

function Broker() {
  return (
    <Stack>
      <Navbar />
      <Divider />
      <LinkBroker />
    </Stack>
  );
}

export default Broker;
