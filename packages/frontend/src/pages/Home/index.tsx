import { Button, Container, Divider, Flex, Stack } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import WatchList from "./components/WatchList";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <Stack style={{ height: "100vh" }}>
      <Navbar />
      <Divider />
      <WatchList />
      <Container width={"full"} py={2}>
        <Flex justify="center">
          <Button colorScheme="primary" onClick={() => navigate("/broker")}>
            Connect Broker
          </Button>
        </Flex>
      </Container>
    </Stack>
  );
}

export default Home;
