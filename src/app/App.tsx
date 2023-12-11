import { ThemeProvider, createTheme } from "@mui/material";
import { PaletteMode } from "@mui/material";
import { getDesignTokens } from "./theme";
import { useThemeChecker } from "../hooks/useThemeChecker";
import { Route, Routes } from "react-router-dom";
import { Global, css } from "@emotion/react";
import LogInPage from "../pages/LogInPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import Layout from "../components/Layout/Layout";

const App = () => {
  const theme = createTheme(getDesignTokens(useThemeChecker() as PaletteMode));

  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={css`
          body {
            margin: 0;
            padding: 0;
            background-color: ${theme.palette.background.default};
          }
          button[type="button"] {
            text-transform: none;
          }
          button[type="submit"] {
            text-transform: none;
          }
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus,
          input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px
              ${theme.palette.mode === "dark" ? "#272727" : "#fff"} inset !important;
          }
        `}
      />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
