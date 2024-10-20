import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { get5PaisaAccessToken } from "../../services/broker";
import { Box, Flex, Heading } from "@chakra-ui/react";

function Auth() {
  const { search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const getAccessToken = async (requestToken: string, state: string) => {
      try {
        await get5PaisaAccessToken(requestToken, state);
        navigate("/home");
      } catch (error) {}
    };

    const urlParams = new URLSearchParams(search);
    const requestToken = urlParams.get("RequestToken");
    const state = urlParams.get("state");

    getAccessToken(requestToken ?? "", state ?? "");

    return () => {};
  }, [search, navigate]);

  return (
    <Flex alignItems={"center"} justifyContent={"center"} height={"100vh"}>
      <Box>
        <Heading textAlign={"center"}>
          Success! You have successfully authenticated with 5Paisa. You are now
          being redirected back to the app...
        </Heading>
      </Box>
    </Flex>
  );
}

export default Auth;
