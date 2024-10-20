import { Card, CardBody, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getHoldings } from "../../../services/portfolio";

interface Holding {
  Symbol: string;
  FullName: string;
  Quantity: number;
  AvgRate: number;
  CurrentPrice: number;
}

function Holdings() {
  const [holdings, setHoldings] = useState<Holding[]>([]);

  useEffect(() => {
    getHoldings().then((data) => {
      setHoldings(data.body.holdings);
    });
  }, []);

  return (
    <Stack margin={4}>
      <Heading size={"lg"}>Portfolio</Heading>
      {JSON.stringify(holdings)}
      {holdings.length === 0 && <h1>No holdings</h1>}
      {holdings.length &&
        holdings.map((holding: Holding, index) => {
          return (
            <Card
              key={index}
              margin={2}
              background={"surface.200"}
              borderColor={"surface.400"}
              borderWidth={1}
            >
              <CardBody>
                <Flex>
                  <Stack flex={1} gap={2}>
                    <Text fontWeight={"600"}>{holding.Symbol}</Text>
                    <Text color={"surface.600"} fontSize={"small"}>
                      {holding.FullName}
                    </Text>
                  </Stack>
                  <Stack gap={2} alignItems={"flex-end"}>
                    <Flex gap={2} alignItems={"baseline"}>
                      <Text fontSize={"small"} color={"surface.600"}>
                        {holding.Quantity} x {holding.AvgRate}
                      </Text>
                      <Text> {holding.CurrentPrice * holding.Quantity} </Text>
                    </Flex>

                    <Flex gap={2} alignItems={"baseline"}>
                      <Text
                        color={
                          holding.CurrentPrice > holding.AvgRate
                            ? "success.100"
                            : "error.100"
                        }
                        fontSize={"small"}
                      >
                        {holding.CurrentPrice}
                      </Text>
                      <Text
                        color={
                          holding.CurrentPrice > holding.AvgRate
                            ? "success.100"
                            : "error.100"
                        }
                      >
                        {(
                          ((holding.CurrentPrice - holding.AvgRate) /
                            holding.AvgRate) *
                          100
                        ).toFixed(2)}
                        %
                      </Text>
                    </Flex>
                  </Stack>
                </Flex>
              </CardBody>
            </Card>
          );
        })}
      {/* <div key={index}>
              <h1>{holding.FullName}</h1>
              <h2>{holding.Quantity}</h2>
              <h3>{holding.AvgRate}</h3>
              <h4>{holding.CurrentPrice}</h4>
            </div> */}
    </Stack>
  );
}

export default Holdings;
