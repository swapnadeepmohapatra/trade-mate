import React from "react";
import {
  Box,
  Card,
  CardBody,
  Container,
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import FivePaisaLogo from "../../../images/logos/5paisa_logo.jpg";
import AngelOneLogo from "../../../images/logos/angel_one_logo.png";
import { get5PaisaOAuthUrl } from "../../../services/broker";

function LinkBroker() {
  const getUrl = async () => {
    const response = await get5PaisaOAuthUrl();
    console.log(response);

    window.location.href = response.body.oAuthLink;
  };

  return (
    <Container>
      <Grid templateColumns="repeat(2, 1fr)" gap={8}>
        <GridItem>
          <Box onClick={getUrl}>
            <Card
              backgroundColor="surfaceMixed.200"
              width={"100%"}
              borderColor="surfaceMixed.400"
              borderWidth={1}
              cursor={"pointer"}
            >
              <CardBody>
                <Stack alignItems={"center"}>
                  <Image
                    src={FivePaisaLogo}
                    alt="5paisa"
                    height={120}
                    borderRadius={10}
                  />
                  <Text textAlign={"center"}>Connect your 5Paisa Account</Text>
                </Stack>
              </CardBody>
            </Card>
          </Box>
        </GridItem>
        <GridItem>
          <Box>
            <Card
              backgroundColor="surfaceMixed.200"
              width={"100%"}
              borderColor="surfaceMixed.400"
              borderWidth={1}
              cursor={"pointer"}
            >
              <CardBody>
                <Stack alignItems={"center"}>
                  <Image
                    src={AngelOneLogo}
                    alt="angel_one"
                    height={120}
                    borderRadius={10}
                  />
                  <Text textAlign={"center"}>
                    Connect your Angel One Account
                  </Text>
                </Stack>
              </CardBody>
            </Card>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
}

export default LinkBroker;
