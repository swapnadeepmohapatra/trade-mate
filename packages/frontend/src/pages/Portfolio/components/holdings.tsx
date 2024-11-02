import React, { useState } from "react";
import {
  Flex,
  Heading,
  Image,
  Stack,
  Button,
  Collapse,
  Box,
} from "@chakra-ui/react";
import HoldingSummary from "./HoldingSummary";
import FilterBar from "./FilterBar";
import { usePortfolio } from "../../../contexts/PortfolioContext";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import HoldingCard from "./HoldingCard";

function Holdings() {
  const {
    holdings,
    totalValue,
    totalCost,
    totalPL,
    groupedByBroker,
    isGroupedByBroker,
  } = usePortfolio();

  const [collapsedBrokers, setCollapsedBrokers] = useState<{
    [key: string]: boolean;
  }>({});

  const [collapsedHoldings, setCollapsedHoldings] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleBrokerCollapse = (brokerId: string) => {
    setCollapsedBrokers((prevState) => ({
      ...prevState,
      [brokerId]: !prevState[brokerId],
    }));
  };

  const toggleHoldingCollapse = (holdingId: string) => {
    setCollapsedHoldings((prevState) => ({
      ...prevState,
      [holdingId]: !prevState[holdingId],
    }));
  };

  return (
    <Stack margin={4}>
      <Heading size={"lg"}>Portfolio</Heading>
      {holdings.length === 0 && <h1>No holdings</h1>}
      {holdings.length > 0 && (
        <HoldingSummary
          totalValue={totalValue}
          totalCost={totalCost}
          totalPL={totalPL}
        />
      )}
      {holdings.length > 0 && <FilterBar />}

      {!isGroupedByBroker &&
        holdings.map((holding, index) => (
          <HoldingCard
            holding={holding}
            key={index}
            collapsedHoldings={collapsedHoldings}
            toggleHoldingCollapse={toggleHoldingCollapse}
          />
        ))}

      {isGroupedByBroker &&
        Object.entries(groupedByBroker).map(([brokerId, brokerHoldings]) => (
          <Stack key={brokerId} margin={2}>
            <Flex
              gap={2}
              alignItems={"center"}
              onClick={() => toggleBrokerCollapse(brokerId)}
              cursor={"pointer"}
            >
              <Flex gap={2} alignItems={"center"}>
                <Image
                  src={brokerHoldings[0].broker.imageUrl}
                  alt={brokerHoldings[0].broker.name}
                  boxSize={8}
                  borderRadius={"lg"}
                />
                <Heading size={"md"}>{brokerHoldings[0].broker.name}</Heading>
              </Flex>
              <Box flex={1} background={"surface.300"} height={0.2} />
              <Button size="sm" variant="link" colorScheme="mixedSurface">
                {collapsedBrokers[brokerId] ? (
                  <MdKeyboardArrowDown size={"1.5em"} />
                ) : (
                  <MdKeyboardArrowUp size={"1.5em"} />
                )}
              </Button>
            </Flex>

            <Collapse in={!collapsedBrokers[brokerId]}>
              {brokerHoldings.map((holding, index) => (
                <HoldingCard
                  holding={holding}
                  key={index}
                  collapsedHoldings={collapsedHoldings}
                  toggleHoldingCollapse={toggleHoldingCollapse}
                />
              ))}
            </Collapse>
          </Stack>
        ))}
    </Stack>
  );
}

export default Holdings;
