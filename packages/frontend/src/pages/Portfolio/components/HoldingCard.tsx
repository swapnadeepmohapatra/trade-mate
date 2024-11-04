import {
  Card,
  CardBody,
  Collapse,
  Flex,
  Stack,
  Text,
  Link,
} from "@chakra-ui/react";
import React from "react";
import { Holding } from "../../../contexts/PortfolioContext";

interface HoldingCardProps {
  holding: Holding;
  collapsedHoldings: { [key: string]: boolean };
  toggleHoldingCollapse: (symbol: string) => void;
}

function HoldingCard({
  holding,
  collapsedHoldings,
  toggleHoldingCollapse,
}: HoldingCardProps) {
  return (
    <Card
      margin={2}
      background={"surface.200"}
      borderColor={"surface.400"}
      borderWidth={1}
    >
      <CardBody>
        <Stack>
          <Flex
            onClick={() => toggleHoldingCollapse(holding.Symbol)}
            cursor={"pointer"}
          >
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
                  ₹ {(holding.CurrentPrice * holding.Quantity).toLocaleString()}
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
                  ₹{" "}
                  {(
                    (holding.CurrentPrice - holding.AvgRate) *
                    holding.Quantity
                  ).toLocaleString()}
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

          <Collapse in={collapsedHoldings[holding.Symbol]}>
            <Flex justifyContent={"space-around"}>
              <Flex gap={4} alignItems={"center"}>
                <Stack>
                  <Text>Quantity</Text>
                  <Text>Average Buy Price</Text>
                  <Text>Investment</Text>
                  <Text>Current Value</Text>
                  <Text>Total Return</Text>
                </Stack>
                <Stack>
                  <Text>{holding.Quantity.toLocaleString()}</Text>
                  <Text>₹ {holding.AvgRate.toLocaleString()}</Text>
                  <Text>
                    ₹ {(holding.AvgRate * holding.Quantity).toLocaleString()}
                  </Text>
                  <Text>
                    ₹{" "}
                    {(holding.CurrentPrice * holding.Quantity).toLocaleString()}
                  </Text>
                  <Text
                    color={
                      holding.CurrentPrice > holding.AvgRate
                        ? "success.100"
                        : "error.100"
                    }
                  >
                    ₹
                    {(
                      holding.CurrentPrice * holding.Quantity -
                      holding.AvgRate * holding.Quantity
                    ).toLocaleString()}{" "}
                    (
                    {(
                      ((holding.CurrentPrice - holding.AvgRate) /
                        holding.AvgRate) *
                      100
                    ).toFixed(2)}
                    %)
                  </Text>
                </Stack>
              </Flex>
              <Flex gap={4} alignItems={"center"}>
                <Stack>
                  <Text>Broker</Text>
                  <Text>Exchange</Text>
                  <Text>Screener</Text>
                  <Text>Finology</Text>
                  <Text>TradingView</Text>
                </Stack>
                <Stack>
                  <Text>{holding.broker.name}</Text>
                  <Text>
                    {holding.Exch === "N"
                      ? "NSE"
                      : holding.Exch === "B"
                        ? "BSE"
                        : holding.Exch}
                  </Text>
                  <Text>
                    <Link
                      href={`https://www.screener.in/company/${holding.Symbol.split("-").length > 1 ? holding.Symbol.split("-")[0] : holding.Symbol}/`}
                      isExternal
                      color={"blue.200"}
                    >
                      View Details
                    </Link>
                  </Text>
                  <Text>
                    <Link
                      href={`https://ticker.finology.in/company/${holding.Symbol.split("-").length > 1 ? holding.Symbol.split("-")[0] : holding.Symbol}`}
                      isExternal
                      color={"blue.200"}
                    >
                      View Details
                    </Link>
                  </Text>
                  <Text>
                    <Link
                      href={`https://in.tradingview.com/chart?symbol=${holding.Symbol.split("-").length > 1 ? holding.Symbol.split("-")[0] : holding.Symbol}`}
                      isExternal
                      color={"blue.200"}
                    >
                      View Details
                    </Link>
                  </Text>
                </Stack>
              </Flex>
            </Flex>
          </Collapse>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default HoldingCard;
