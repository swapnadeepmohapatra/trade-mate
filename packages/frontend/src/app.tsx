import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import Router from "./router";
import { theme } from "./utils/theme";
import { UserProvider } from "./contexts/UserContext";
import { PortfolioProvider } from "./contexts/PortfolioContext";
import { MarginProvider } from "./contexts/MarginContext";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <PortfolioProvider>
          <MarginProvider>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Router />
          </MarginProvider>
        </PortfolioProvider>
      </UserProvider>
    </ChakraProvider>
  );
}

export default App;
