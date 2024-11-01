import React from "react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import Router from "./router";
import { theme } from "./utils/theme";
import { UserProvider } from "./contexts/UserContext";
import { PortfolioProvider } from "./contexts/PortfolioContext";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <PortfolioProvider>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Router />
        </PortfolioProvider>
      </UserProvider>
    </ChakraProvider>
  );
}

export default App;
