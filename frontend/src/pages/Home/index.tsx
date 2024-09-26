import React, { useEffect } from "react";
import { Stack, useColorMode } from "@chakra-ui/react";
import Hero from "./components/hero";
import Navbar from "./components/navbar";

function Home() {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode !== "dark") {
      toggleColorMode();
    }
  }, [colorMode, toggleColorMode]);

  return (
    <Stack>
      <Navbar />
      <Hero />
    </Stack>
  );
}

export default Home;
