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
import GrowwLogo from "../../../images/logos/groww.png";
import AngelOneLogo from "../../../images/logos/angel_one_logo.png";
import UpstoxLogo from "../../../images/logos/upstox.png";
import KiteLogo from "../../../images/logos/kite.png";
import KotakLogo from "../../../images/logos/kotak.jpg";
import HdfcSkyLogo from "../../../images/logos/hdfc_sky.jpeg";
import PaytmMoneyLogo from "../../../images/logos/paytm_money.jpg";
import {
  get5PaisaOAuthUrl,
  getAngelOneOAuthUrl,
  getHdfcSkyOAuthUrl,
} from "../../../services/broker";

function LinkBroker() {
  const get5PaisaUrl = async () => {
    const response = await get5PaisaOAuthUrl();
    console.log(response);

    window.location.href = response.body.oAuthLink;
  };

  const getAngelOneUrl = async () => {
    const response = await getAngelOneOAuthUrl();
    console.log(response);

    window.location.href = response.body.oAuthLink;
  };

  const getHdfcSkyUrl = async () => {
    const response = await getHdfcSkyOAuthUrl();
    console.log(response);

    window.location.href = response.body.oAuthLink;
  };

  return (
    <Container>
      <Grid templateColumns="repeat(2, 1fr)" gap={8}>
        <GridItem>
          <Box onClick={get5PaisaUrl}>
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
          <Box onClick={getAngelOneUrl}>
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
        <GridItem>
          <Box onClick={getHdfcSkyUrl}>
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
                    src={HdfcSkyLogo}
                    alt="angel_one"
                    height={120}
                    borderRadius={10}
                  />
                  <Text textAlign={"center"}>
                    Connect your HDFC Sky Account
                  </Text>
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
                    src={PaytmMoneyLogo}
                    alt="angel_one"
                    height={120}
                    borderRadius={10}
                  />
                  <Text textAlign={"center"}>
                    Connect your PayTM Money Account
                  </Text>
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
                    src={GrowwLogo}
                    alt="angel_one"
                    height={120}
                    borderRadius={10}
                  />
                  <Text textAlign={"center"}>Connect your Groww Account</Text>
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
                    src={KiteLogo}
                    alt="angel_one"
                    height={120}
                    borderRadius={10}
                  />
                  <Text textAlign={"center"}>Connect your Kite Account</Text>
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
                    src={UpstoxLogo}
                    alt="angel_one"
                    height={120}
                    borderRadius={10}
                  />
                  <Text textAlign={"center"}>Connect your Upstox Account</Text>
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
                    src={KotakLogo}
                    alt="angel_one"
                    height={120}
                    borderRadius={10}
                  />
                  <Text textAlign={"center"}>Connect your Kotak Account</Text>
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
