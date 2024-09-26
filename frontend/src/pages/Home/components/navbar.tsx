import { Stack, Heading, Button } from "@chakra-ui/react";
import React from "react";

function Navbar() {
  return (
    <Stack direction="row" alignItems="center">
      <Heading>TradeMate</Heading>
      <Stack direction="row" flex={1} justifyContent={"center"}>
        <Button>Home</Button>
        <Button>Portfolio</Button>
        <Button>News</Button>
      </Stack>
      <Button>Connect Broker</Button>
    </Stack>
  );
}

export default Navbar;
