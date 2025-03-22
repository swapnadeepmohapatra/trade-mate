import { Card, CardBody, Flex, Stack, Text } from "@chakra-ui/react";

interface MarginSummaryProps {
  total: number;
  available: number;
  used: number;
}

function MarginSummary({ total, available, used }: MarginSummaryProps) {
  return (
    <Card
      margin={2}
      background={"surfaceMixed.200"}
      borderColor={"surfaceMixed.500"}
      borderWidth={1}
      padding={2}
    >
      <CardBody>
        <Flex>
          <Stack flex={1} gap={2}>
            <Flex gap={2} alignItems={"baseline"}>
              <Text fontSize={"lg"}>Available Margin:</Text>
              <Text fontSize={"2xl"} fontWeight={"semibold"}>
                ₹ {available.toLocaleString()}
              </Text>
            </Flex>
            <Flex gap={2}>
              <Text fontSize={"lg"}>Used Margin:</Text>
              <Text fontSize={"lg"}>₹ {used.toLocaleString()}</Text>
            </Flex>
            <Flex gap={2}>
              <Text fontSize={"lg"}>Total Margin:</Text>
              <Text fontSize={"lg"}>₹ {total.toLocaleString()}</Text>
            </Flex>
          </Stack>
        </Flex>
      </CardBody>
    </Card>
  );
}

export default MarginSummary;
