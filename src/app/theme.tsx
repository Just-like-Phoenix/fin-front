import { PaletteMode } from "@mui/material";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "dark"
      ? {
          // palette values for dark mode
          primary: {
            main: "#387356",
          },
          secondary: {
            main: "#9c27b0",
          },
          background: {
            default: "#121212",
            paper: "#121212",
          },
        }
      : {
          // palette values for light mode
          primary: {
            main: "#387356",
          },
          secondary: {
            main: "#9c27b0",
          },
          background: {
            default: "#fff",
            paper: "#fff",
          },
        }),
  },
});
