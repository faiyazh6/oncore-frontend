import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  fonts: {
    heading: `'Manrope', sans-serif`,
    body: `'Manrope', sans-serif`,
  },
  colors: {
    primary: {
      500: "#222E93", // Base color
      600: "#1C2373", // Darker shade for hover
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "8px",
        padding: "10px 16px",
        gap: "6px",
      },
      sizes: {
        md: {
          height: "39px",
          minWidth: "89px",
        },
      },
      variants: {
        solid: {
          bg: "primary.500",
          color: "white",
          _hover: {
            bg: "primary.600",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
          },
        },
      },
    },
  },
});

export default customTheme;