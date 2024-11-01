import React, { useEffect } from "react";
import { Heading, Link, Stack, Text, useColorMode } from "@chakra-ui/react";
import Hero from "./components/hero";
import Navbar from "../../components/Navbar";
import Scroll from "./components/Scroll";

function Landing() {
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
      <Heading textAlign="center" size="lg" marginTop={"16"} marginBottom={"8"}>
        Our Broker Partners
      </Heading>
      <Scroll />
      <Text textAlign="center" size="lg" marginTop={"8"}>
        Don&apos;t have a broker account?{" "}
        <Link
          href="https://zerodha.com/open-account?c=LR5499"
          isExternal
          color="primary.300"
        >
          Open Broker Account
        </Link>
      </Text>
    </Stack>
  );
}

export default Landing;
