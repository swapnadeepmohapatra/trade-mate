import React from "react";
import { Stack, Heading, Button, Box } from "@chakra-ui/react";

function Navbar() {
  return (
    <>
      <Box
        w="80vw"
        h="0"
        boxShadow={`0px 0px 200px 20px rgba(144, 251, 63, 0.5)`}
        alignSelf={"center"}
      />
      <Stack direction="row" alignItems="center" padding={4}>
        <Heading flex={1}>TradeMate</Heading>
        <Stack direction="row" flex={1} justifyContent={"center"}>
          <Button>Home</Button>
          <Button>Portfolio</Button>
          <Button>News</Button>
        </Stack>
        <Stack flex={1} justifyContent={"flex-end"} alignItems={"flex-end"}>
          <Button>Connect Broker</Button>
        </Stack>
      </Stack>
    </>
  );
}

export default Navbar;
