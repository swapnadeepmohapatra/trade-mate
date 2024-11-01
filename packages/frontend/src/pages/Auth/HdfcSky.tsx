import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getHdfcSkyAccessToken } from "../../services/broker";
import { Box, Flex, Heading } from "@chakra-ui/react";

function HdfcSkyAuth() {
  const { search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const getAccessToken = async (requestToken: string, state: string) => {
      try {
        await getHdfcSkyAccessToken(requestToken, state);
        navigate("/home");
      } catch (error) {
        console.log(error);
      }
    };

    const urlParams = new URLSearchParams(search);
    const requestToken = urlParams.get("requestToken");
    const state = urlParams.get("state");

    getAccessToken(requestToken ?? "", state ?? "");

    return () => {};
  }, [search, navigate]);

  return (
    <Flex alignItems={"center"} justifyContent={"center"} height={"100vh"}>
      <Box>
        <Heading textAlign={"center"}>
          Success! You have successfully authenticated with Hdfc Sky. You are
          now being redirected back to the app...
        </Heading>
      </Box>
    </Flex>
  );
}

export default HdfcSkyAuth;
