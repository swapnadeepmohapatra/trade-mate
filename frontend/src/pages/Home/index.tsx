import { Box, Container, Heading, Text, useColorMode } from "@chakra-ui/react";
import React, { useEffect } from "react";
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
    <Box>
      <Navbar />
      <Hero />
    </Box>
  );
}

export default Home;
