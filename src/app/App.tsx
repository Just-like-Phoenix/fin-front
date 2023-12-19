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
import ProfilePage from "../pages/ProfilePage";
import OrganizationsPage from "../pages/OrganizationsPage";
import SearchPage from "../pages/SearchPage";
import OrganizationCreatePage from "../pages/OrganizationCreatePage";
import ProfileEditPage from "../pages/ProfileEditPage";
import OrganizationPage from "../pages/OrganizationPage";
import IndicatorCreatePage from "../pages/IndicatorCreatePage";
import IndicatorPage from "../pages/IndicatorPage";

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
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/organizations">
            <Route index element={<OrganizationsPage />} />
            <Route path=":organizationID" element={<OrganizationPage />} />
          </Route>
          <Route path="/organizations/:organizationID/indicators">
            <Route index element={<OrganizationsPage />} />
            <Route path=":indicatorsID" element={<IndicatorPage />} />
          </Route>
          <Route path="/search" element={<SearchPage />} />
        </Route>
        <Route
          path="/organizations/create"
          element={<OrganizationCreatePage />}
        />
        <Route
          path="/organizations/:organizationID/indicators/create"
          element={<IndicatorCreatePage />}
        />
        <Route path="/profile/edit" element={<ProfileEditPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
