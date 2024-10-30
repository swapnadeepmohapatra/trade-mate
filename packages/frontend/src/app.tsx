import React from "react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import Router from "./router";
import { theme } from "./utils/theme";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Router />
      </UserProvider>
    </ChakraProvider>
  );
}

export default App;
