import { Stack } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import Navbar from "./components/Navbar";

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
    </Stack>
  );
}

export default Home;
