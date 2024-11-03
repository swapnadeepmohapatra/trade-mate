import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  get5PaisaOAuthUrl,
  getAllBrokers,
  getAngelOneOAuthUrl,
  getHdfcSkyOAuthUrl,
  getOtherBrokersOAuthUrl,
  getUpstoxOAuthUrl,
} from "../../../services/broker";
import { MdRefresh } from "react-icons/md";

interface Broker {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: string;
}

function LinkBroker() {
  const [brokers, setBrokers] = useState([]);

  useEffect(() => {
    getAllBrokers().then((response) => {
      if (response.success) {
        setBrokers(response.body.brokers);
      }
    });
  }, []);

  const getOAuthUrl = async (brokerName: string) => {
    switch (brokerName) {
      case "5Paisa": {
        const fivePaisaResponse = await get5PaisaOAuthUrl();
        window.location.href = fivePaisaResponse.body.oAuthLink;
        break;
      }
      case "AngelOne": {
        const angelOneResponse = await getAngelOneOAuthUrl();
        window.location.href = angelOneResponse.body.oAuthLink;
        break;
      }
      case "HdfcSky": {
        const hdfcSkyResponse = await getHdfcSkyOAuthUrl();
        window.location.href = hdfcSkyResponse.body.oAuthLink;
        break;
      }
      case "Upstox": {
        const upstoxResponse = await getUpstoxOAuthUrl();
        window.location.href = upstoxResponse.body.oAuthLink;
        break;
      }
      default: {
        const otherBrokerResponse = await getOtherBrokersOAuthUrl(brokerName);
        if (otherBrokerResponse?.body?.oAuthLink) {
          window.location.href = otherBrokerResponse.body.oAuthLink;
        }
        break;
      }
    }
  };

  return (
    <Container maxWidth={"container.lg"} mb={8}>
      <Grid templateColumns="repeat(3, 1fr)" gap={8} alignItems={"stretch"}>
        {brokers.map((broker: Broker) => (
          <GridItem key={broker.id}>
            <Box height="100%">
              <Card
                backgroundColor="surfaceMixed.200"
                width={"100%"}
                height="100%"
                borderColor="surfaceMixed.400"
                borderWidth={1}
              >
                <CardBody>
                  <Stack alignItems={"center"} justifyContent="space-between">
                    <Image
                      src={broker.imageUrl}
                      alt={broker.name}
                      height={120}
                      borderRadius={10}
                    />
                    {broker.createdAt ? (
                      <Stack alignItems={"center"} spacing={4}>
                        <Text
                          textAlign={"center"}
                          fontSize={"xl"}
                          fontWeight={"semibold"}
                        >
                          {broker.name}
                        </Text>
                        <Text textAlign={"center"}>
                          Connected on{" "}
                          {new Date(broker.createdAt).toLocaleDateString()}
                        </Text>
                        <Button
                          onClick={() => getOAuthUrl(broker.name)}
                          colorScheme={"primary"}
                          leftIcon={<MdRefresh size={"1.5em"} />}
                        >
                          Refresh
                        </Button>
                      </Stack>
                    ) : (
                      <Stack alignItems={"center"} spacing={4}>
                        <Text
                          textAlign={"center"}
                          fontSize={"xl"}
                          fontWeight={"semibold"}
                        >
                          {broker.name}
                        </Text>
                        <Button
                          onClick={() => getOAuthUrl(broker.name)}
                          colorScheme={"primary"}
                        >
                          Connect Broker
                        </Button>
                      </Stack>
                    )}
                  </Stack>
                </CardBody>
              </Card>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
}

export default LinkBroker;
