import { useState } from "react";
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
import { useNavigate } from "react-router-dom";

function Holdings() {
  const {
    holdings,
    totalValue,
    totalCost,
    totalPL,
    groupedByBroker,
    isGroupedByBroker,
  } = usePortfolio();

  const navigate = useNavigate();

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
      <HoldingSummary
        totalValue={totalValue}
        totalCost={totalCost}
        totalPL={totalPL}
      />
      <FilterBar />
      {holdings.length === 0 && (
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          height={"50vh"}
          fontSize={"xl"}
          flexDirection={"column"}
          gap={4}
        >
          No Holdings Found
          <Button colorScheme="primary" onClick={() => navigate("/broker")}>
            Connect Broker
          </Button>
        </Flex>
      )}
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
