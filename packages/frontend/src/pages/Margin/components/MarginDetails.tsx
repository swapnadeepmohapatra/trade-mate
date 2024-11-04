import React from "react";
import { Stack } from "@chakra-ui/react";
import MarginSummary from "./MarginSummary";
import { useMargin } from "../../../contexts/MarginContext";
import MarginCard from "./MarginCard";

function MarginDetails() {
  const {
    totalAvailableMargin,
    totalUtilizedMargin,
    totalMarginValue,
    marginData,
  } = useMargin();
  return (
    <Stack>
      <MarginSummary
        total={totalMarginValue}
        used={totalUtilizedMargin}
        available={totalAvailableMargin}
      />
      {marginData.length > 0 &&
        marginData.map((margin) => (
          <MarginCard key={margin.broker.id} data={margin} />
        ))}
    </Stack>
  );
}

export default MarginDetails;
