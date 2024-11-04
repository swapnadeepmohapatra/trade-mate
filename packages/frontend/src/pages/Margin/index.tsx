import { Divider, Stack } from "@chakra-ui/react";
import React from "react";
import Navbar from "../../components/Navbar";
import MarginDetails from "./components/MarginDetails";

function Margin() {
  return (
    <Stack>
      <Navbar />
      <Divider />
      <MarginDetails />
    </Stack>
  );
}

export default Margin;
