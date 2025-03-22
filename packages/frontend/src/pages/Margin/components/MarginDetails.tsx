import { Stack } from "@chakra-ui/react";
import MarginSummary from "./MarginSummary";
import { useMargin } from "../../../contexts/MarginContext";
import MarginCard from "./MarginCard";
import MarginFilterBar from "./FilterBar";

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
      <MarginFilterBar />
      {marginData.length === 0 && <p>No data available</p>}
      {marginData.length > 0 &&
        marginData.map((margin) => (
          <MarginCard key={margin.broker.id} data={margin} />
        ))}
    </Stack>
  );
}

export default MarginDetails;
