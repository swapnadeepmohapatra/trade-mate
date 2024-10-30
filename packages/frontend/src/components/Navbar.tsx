import React from "react";
import {
  Box,
  Button,
  Heading,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logoutUser } = useUserContext();

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
          <Button
            colorScheme={location.pathname === "/home" ? "primary" : "gray"}
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </Button>
          <Button
            colorScheme={
              location.pathname === "/portfolio" ? "primary" : "gray"
            }
            onClick={() => {
              navigate("/portfolio");
            }}
          >
            Portfolio
          </Button>
          <Button
            colorScheme={location.pathname === "/news" ? "primary" : "gray"}
            onClick={() => {
              navigate("/news");
            }}
          >
            News
          </Button>
        </Stack>
        {user ? (
          <Stack flex={1} alignItems={"flex-end"}>
            <Menu>
              <MenuButton>
                <Tag
                  size={"lg"}
                  borderRadius="full"
                  variant="solid"
                  colorScheme="surfaceMixed"
                >
                  <TagLeftIcon boxSize="12px" as={FaUser}></TagLeftIcon>
                  <TagLabel>{user?.name}</TagLabel>
                </Tag>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => logoutUser()}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        ) : (
          <Stack flex={1} justifyContent={"flex-end"} alignItems={"flex-end"}>
            <Button
              onClick={() => {
                navigate("/home");
              }}
            >
              Connect Broker
            </Button>
          </Stack>
        )}
      </Stack>
    </>
  );
}

export default Navbar;
