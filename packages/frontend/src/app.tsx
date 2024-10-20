import React from "react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import Router from "./router";
import { theme } from "./utils/theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Router />
    </ChakraProvider>
  );
}

export default App;
