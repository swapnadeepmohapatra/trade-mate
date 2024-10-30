import React, { useEffect } from "react";
import { Divider, Stack } from "@chakra-ui/react";
import axios from "axios";
import LinkBroker from "./components/LinkBroker";
import Navbar from "../../components/Navbar";

function Home() {
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/auth/user", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Stack>
      <Navbar />
      <Divider />
      <LinkBroker />
    </Stack>
  );
}

export default Home;
