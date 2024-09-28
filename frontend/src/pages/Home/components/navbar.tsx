import React from "react";
import {
  Box,
  Button,
  Heading,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";

function Navbar() {
  return (
    <>
      <Box
        w="80vw"
        h="0"
        boxShadow={`0px 0px 200px 20px rgba(144, 251, 63, 0.5)`}
        alignSelf={"center"}
      />
      <Stack direction="row" alignItems="center" padding={4}>
        <Heading flex={1}>TradeMate</Heading>
        <Stack direction="row" flex={1} justifyContent={"center"}>
          <Button colorScheme="gray">Home</Button>
          <Button colorScheme="primary">Portfolio</Button>
          <Button>News</Button>
        </Stack>
        <Stack flex={1} alignItems={"flex-end"}>
          <Tag
            size={"lg"}
            borderRadius="full"
            variant="solid"
            colorScheme="surfaceMixed"
          >
            <TagLeftIcon boxSize="12px" as={FaUser}></TagLeftIcon>
            <TagLabel>Swapnadeep</TagLabel>
          </Tag>
        </Stack>
      </Stack>
    </>
  );
}

export default Navbar;
