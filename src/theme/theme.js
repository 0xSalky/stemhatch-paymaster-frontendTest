import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
  colors: {
    gray: {
      50: "#f7fafc",
      // ...
      600: "#383b3f",
      700: "#242629",
      800: "#0b1111",
      900: "#0b0c0c",
    },
    pink: {
      200: "#ff16ef",
    },
    teal: {
      200: "#03ffe0",
      800: "#0c3335",
    },
  },
});
