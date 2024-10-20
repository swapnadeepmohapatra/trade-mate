import { Colors, extendTheme, ThemeConfig } from "@chakra-ui/react";

const fonts = {
  heading: "DM Sans, sans-serif",
  body: "DM Sans, sans-serif",
};

const colors: Colors = {
  gray: {
    100: "rgba(0, 0, 0, 0.1)",
    200: "rgba(0, 0, 0, 0.1)",
    300: "rgba(0, 0, 0, 0.25)",
    400: "rgba(0, 0, 0, 0.4)",
    500: "rgba(0, 0, 0, 0.55)",
    600: "rgba(0, 0, 0, 0.7)",
    700: "rgba(0, 0, 0, 0.85)",
    800: "rgba(0, 0, 0, 1)",
    900: "rgba(0, 0, 0, 1)",
  },
  primary: {
    100: "#90fb3f",
    200: "#a0fc5b",
    300: "#aefd72",
    400: "#bcfd88",
    500: "#c8fe9d",
    600: "#d4feb1",
  },
  surface: {
    100: "#121212",
    200: "#282828",
    300: "#3f3f3f",
    400: "#575757",
    500: "#717171",
    600: "#8b8b8b",
  },
  surfaceMixed: {
    100: "#1f2519",
    200: "#34392e",
    300: "#4a4f45",
    400: "#61665c",
    500: "#7a7e75",
    600: "#93968f",
  },
  error: {
    100: "#ff0035",
    200: "#ff365e",
    300: "#ff6872",
    400: "#ff9aa3",
    500: "#ffccd5",
    600: "#ffe6eb",
  },
  success: {
    100: "#24cd24",
    200: "#50d750",
    300: "#7ce17c",
    400: "#a8eba8",
    500: "#d4f5d4",
    600: "#e8fae8",
  },
  warning: {
    100: "#ffc400",
    200: "#ffd033",
    300: "#ffdd66",
    400: "#ffe899",
    500: "#fff4cc",
    600: "#fff9e5",
  },
  info: {
    100: "#0098ff",
    200: "#33acff",
    300: "#66c1ff",
    400: "#99d5ff",
    500: "#cceaff",
    600: "#e5f5ff",
  },
};

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme = extendTheme({ config, colors, fonts });
