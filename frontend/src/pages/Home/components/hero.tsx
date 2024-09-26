import { Box, Container, Heading, Text } from "@chakra-ui/react";
import React from "react";

function Hero() {
  return (
    <Container>
      <Box maxWidth="2xl">
        <Heading textAlign="center" size="3xl" marginBottom={8}>
          Your Portfolio, Unified
        </Heading>
        <Text textAlign="center" fontSize="xl" color="surfaceMixed.600">
          Why juggle between multiple platforms? Get a single, seamless view of
          your investments and place orders with ease, all in one place.
        </Text>
      </Box>
    </Container>
  );
}

export default Hero;
