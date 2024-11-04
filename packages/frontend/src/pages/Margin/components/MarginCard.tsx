import {
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface Broker {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Margin {
  AvailableMargin: number;
  UtilizedMargin: number;
  TotalMargin: number;
  DPFreeStockValue: number;
  broker: Broker;
}

interface MarginCardProps {
  data: Margin;
}

function MarginCard({ data }: MarginCardProps) {
  return (
    <Card
      margin={2}
      background={"surface.200"}
      borderColor={"surface.400"}
      borderWidth={1}
    >
      <CardBody>
        <Stack>
          <Flex gap={2} alignItems={"center"}>
            <Image
              src={data.broker.imageUrl}
              alt={data.broker.name}
              boxSize={8}
              borderRadius={"lg"}
            />
            <Heading size={"md"}>{data.broker.name}</Heading>
          </Flex>
          <Flex gap={2} alignItems={"baseline"}>
            <Text>Available Margin:</Text>
            <Text fontSize={"large"} fontWeight={"semibold"}>
              ₹ {data.AvailableMargin}
            </Text>
          </Flex>
          <Flex gap={2} alignItems={"baseline"}>
            <Text>Utilized Margin:</Text>
            <Text>₹ {data.UtilizedMargin}</Text>
          </Flex>
          <Flex gap={2} alignItems={"baseline"}>
            <Text>Total Margin:</Text>
            <Text>₹ {data.TotalMargin}</Text>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default MarginCard;
