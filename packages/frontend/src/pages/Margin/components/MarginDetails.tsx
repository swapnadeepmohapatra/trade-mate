import { Button, Flex, Stack } from "@chakra-ui/react";
import MarginSummary from "./MarginSummary";
import { useMargin } from "../../../contexts/MarginContext";
import MarginCard from "./MarginCard";
import MarginFilterBar from "./FilterBar";
import { useNavigate } from "react-router-dom";

function MarginDetails() {
  const {
    totalAvailableMargin,
    totalUtilizedMargin,
    totalMarginValue,
    marginData,
  } = useMargin();

  const navigate = useNavigate();

  return (
    <Stack>
      <MarginSummary
        total={totalMarginValue}
        used={totalUtilizedMargin}
        available={totalAvailableMargin}
      />
      <MarginFilterBar />
      {marginData.length === 0 && (
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          height={"50vh"}
          fontSize={"xl"}
          flexDirection={"column"}
          gap={4}
        >
          No Data Found
          <Button colorScheme="primary" onClick={() => navigate("/broker")}>
            Connect Broker
          </Button>
        </Flex>
      )}
      {marginData.length > 0 &&
        marginData.map((margin) => (
          <MarginCard key={margin.broker.id} data={margin} />
        ))}
    </Stack>
  );
}

export default MarginDetails;
