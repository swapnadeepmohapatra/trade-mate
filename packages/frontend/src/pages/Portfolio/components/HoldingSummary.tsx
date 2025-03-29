import {
  Card,
  CardBody,
  Flex,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";

interface HoldingSummaryProps {
  totalValue: number;
  totalCost: number;
  totalPL: number;
}

function HoldingSummary({
  totalValue,
  totalCost,
  totalPL,
}: HoldingSummaryProps) {
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

  return (
    <Card
      margin={2}
      background={"surfaceMixed.200"}
      borderColor={"surfaceMixed.500"}
      borderWidth={1}
      padding={2}
    >
      <CardBody>
        <Flex direction={isSmallScreen ? "column" : "row"}>
          <Stack flex={1} gap={2}>
            <Flex gap={2} alignItems={"baseline"}>
              <Text fontSize={"lg"}>Present Value:</Text>
              <Text fontSize={"2xl"} fontWeight={"semibold"}>
                ₹ {totalValue.toLocaleString()}
              </Text>
            </Flex>
            <Flex gap={2}>
              <Text fontSize={"lg"}>Invested Value:</Text>
              <Text fontSize={"lg"}>₹ {totalCost.toLocaleString()}</Text>
            </Flex>
          </Stack>
          <Stack gap={2} alignItems={isSmallScreen ? "flex-start" : "flex-end"}>
            <Flex gap={2}>
              <Text fontSize={"lg"}>
                Overall {totalPL > 0 ? "Gain" : "Loss"}:{" "}
              </Text>
              <Text
                fontSize={"lg"}
                color={totalPL > 0 ? "success.100" : "error.100"}
              >
                {totalPL > 0 ? "₹ " : "₹ "}
                {Math.abs(totalPL).toLocaleString()}
              </Text>
            </Flex>
            <Flex gap={2}>
              <Text fontSize={"lg"}>
                {isSmallScreen
                  ? `Total ${totalPL > 0 ? "Gain" : "Loss"} %: `
                  : ""}
              </Text>
              <Text
                fontSize={"lg"}
                color={totalPL > 0 ? "success.100" : "error.100"}
              >
                {((totalPL / totalCost) * 100).toFixed(2) ?? "-"} %
              </Text>
            </Flex>
          </Stack>
        </Flex>
      </CardBody>
    </Card>
  );
}

export default HoldingSummary;
