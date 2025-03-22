import { Divider, Stack } from "@chakra-ui/react";
import Holdings from "./components/holdings";
import Navbar from "../../components/Navbar";

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
