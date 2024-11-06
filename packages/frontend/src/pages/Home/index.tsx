import React from "react";
import { Button, Container, Divider, Flex, Stack } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import WatchList from "./components/WatchList";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <Stack>
      <Navbar />
      <Divider />
      <WatchList />
      <Container width={"full"}>
        <Flex justify="center" py={8}>
          <Button colorScheme="primary" onClick={() => navigate("/broker")}>
            Connect Broker
          </Button>
        </Flex>
      </Container>
    </Stack>
  );
}

export default Home;
