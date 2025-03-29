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
  MenuDivider,
  useMediaQuery,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerHeader,
  IconButton,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { MdMenu } from "react-icons/md";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logoutUser } = useUserContext();
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        w="80vw"
        h="0"
        boxShadow={`0px 0px 200px 20px rgba(144, 251, 63, 0.5)`}
        alignSelf={"center"}
      />
      <Stack direction="row" alignItems="center" padding={4}>
        <Box flex={1}>
          <Heading
            style={{
              width: "fit-content",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            TradeMate
          </Heading>
        </Box>
        {!isSmallScreen && (
          <Stack direction="row" flex={1} justifyContent={"center"}>
            <Button
              colorScheme={location.pathname === "/home" ? "primary" : "gray"}
              onClick={() => {
                navigate("/home");
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
        )}
        {!isSmallScreen && (
          <>
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
                    <MenuItem onClick={() => navigate("/margin")}>
                      Margin
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={() => logoutUser()}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </Stack>
            ) : (
              <Stack
                flex={1}
                justifyContent={"flex-end"}
                alignItems={"flex-end"}
              >
                <Button
                  onClick={() => {
                    navigate("/home");
                  }}
                >
                  Connect Broker
                </Button>
              </Stack>
            )}
          </>
        )}
        {isSmallScreen && (
          <IconButton aria-label="menu" icon={<MdMenu />} onClick={onOpen} />
        )}
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          // finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader />
            <DrawerBody>
              <Stack flex={1} justifyContent={"center"} mt={8}>
                <Button
                  colorScheme={
                    location.pathname === "/home" ? "primary" : "gray"
                  }
                  onClick={() => {
                    navigate("/home");
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
                  colorScheme={
                    location.pathname === "/news" ? "primary" : "gray"
                  }
                  onClick={() => {
                    navigate("/news");
                  }}
                >
                  News
                </Button>
              </Stack>
              {user ? (
                <Stack mt={8}>
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
                      <MenuItem onClick={() => navigate("/margin")}>
                        Margin
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem onClick={() => logoutUser()}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                </Stack>
              ) : (
                <Stack mt={8}>
                  <Button
                    onClick={() => {
                      navigate("/broker");
                    }}
                  >
                    Connect Broker
                  </Button>
                </Stack>
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Stack>
    </>
  );
}

export default Navbar;
