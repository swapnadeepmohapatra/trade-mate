import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <Container>
      <Stack maxWidth="2xl" marginTop={40}>
        <Heading textAlign="center" size="3xl" marginBottom={8}>
          Your Portfolio, Unified
        </Heading>
        <Box
          position={"absolute"}
          w="0px"
          h="100px"
          boxShadow={`0px 0px 500px 100px rgba(144, 251, 63, 0.3)`}
          alignSelf={"center"}
          background={"#c1c1c1"}
          marginTop={8}
          zIndex={-1}
        />
        <Text textAlign="center" fontSize="xl" color="whiteAlpha.700">
          Why juggle between multiple platforms? Get a single, seamless view of
          your investments get company financials and AI-powered
          recommendations, all in one place.
        </Text>
        <Stack direction="row" justifyContent="center" marginTop={8}>
          {["Consolidated Portfolio", "Company Financials", "AI Insights"].map(
            (feature) => (
              <Tag
                size={"lg"}
                borderRadius="full"
                variant="solid"
                colorScheme="surfaceMixed"
                key={feature}
              >
                <TagLabel>{feature}</TagLabel>
              </Tag>
            )
          )}
        </Stack>
        <Flex alignItems="center" justifyContent="center" gap={4}>
          <Button
            colorScheme="primary"
            size={"lg"}
            alignSelf={"center"}
            marginTop={16}
            onClick={() => {
              navigate("/home");
            }}
          >
            Explore Stocks
          </Button>
          <Button
            colorScheme="primary"
            size={"lg"}
            alignSelf={"center"}
            marginTop={16}
            onClick={() => {
              navigate("/broker");
            }}
          >
            Connect Broker
          </Button>
        </Flex>
      </Stack>
    </Container>
  );
}

export default Hero;
