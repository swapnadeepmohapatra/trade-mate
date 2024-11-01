import React from "react";
import { Card, CardBody, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import HoldingSummary from "./HoldingSummary";
import FilterBar from "./FilterBar";
import { usePortfolio } from "../../../contexts/PortfolioContext";

function Holdings() {
  const { holdings, totalValue, totalCost, totalPL } = usePortfolio();

  return (
    <Stack margin={4}>
      <Heading size={"lg"}>Portfolio</Heading>
      {JSON.stringify(holdings)}
      {holdings.length === 0 && <h1>No holdings</h1>}
      {holdings.length > 0 && (
        <HoldingSummary
          totalValue={totalValue}
          totalCost={totalCost}
          totalPL={totalPL}
        />
      )}
      {holdings.length > 0 && <FilterBar />}
      {holdings.map((holding, index) => (
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
                    {holding.Quantity.toLocaleString()} x ₹{" "}
                    {holding.AvgRate.toLocaleString()}
                  </Text>
                  <Text>
                    ₹{" "}
                    {(holding.CurrentPrice * holding.Quantity).toLocaleString()}
                  </Text>
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
                    ₹ {holding.CurrentPrice.toLocaleString()}
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
                    ).toLocaleString()}
                    %
                  </Text>
                </Flex>
              </Stack>
            </Flex>
          </CardBody>
        </Card>
      ))}
    </Stack>
  );
}

export default Holdings;
