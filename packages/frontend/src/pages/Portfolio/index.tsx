import React from "react";
import Navbar from "../Home/components/Navbar";
import { Divider, Stack } from "@chakra-ui/react";
import Holdings from "./components/holdings";

function Portfolio() {
  return (
    <Stack>
      <Navbar />
      <Divider />
      <Holdings />
    </Stack>
  );
}

export default Portfolio;
