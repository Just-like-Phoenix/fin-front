import { Outlet, useNavigate } from "react-router-dom";
import {
  styled,
  Box,
  AppBar,
  Toolbar,
  Stack,
  Button,
  IconButton,
} from "@mui/material";
import { Menu, KeyboardArrowDown } from "@mui/icons-material";
import { NavigationRail } from "../NavigationRail/NavigationRail";
import { NavigationDrawer } from "../NavigationDrawer/NavigationDrawer";
import Cookies from "js-cookie";
import { useState } from "react";
import ProfileMenu from "./ProfileMenu";
import TemporaryDrawer from "../TemporaryDrawer/TemporaryDrawer";
import { bindTrigger, usePopupState } from "material-ui-popup-state/hooks";

const LayoutBox = styled(Box)(({ theme }) => ({
  height: "100vh",
  display: "flex",
}));

const ProfileButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  "@media (max-width: 600px)": {
    display: "block",
  },
  display: "none",
}));

const Layout = () => {
  const navigate = useNavigate();
  const popupState = usePopupState({ variant: "popover", popupId: "demoMenu" });
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <LayoutBox>
      <AppBar elevation={4}>
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            sx={{
              display: Cookies.get("isLogin") === "true" ? "flex" : "none",
            }}
            onClick={(e) => navigate("/login")}
          >
            Войти
          </Button>
          <ProfileButton
            variant="text"
            {...bindTrigger(popupState)}
            sx={{
              display: Cookies.get("isLogin") === "true" ? "none" : "flex",
            }}
            endIcon={<KeyboardArrowDown />}
          >
            {Cookies.get("username")}
          </ProfileButton>
          <MenuButton onClick={(e) => setOpenDrawer(true)}>
            <Menu />
          </MenuButton>
        </Toolbar>
      </AppBar>
      <Stack
        sx={{ marginTop: 8 }}
        display={"flex"}
        direction={"row"}
        width={"100%"}
      >
        <ProfileMenu popupState={popupState} />
        <NavigationRail />
        <NavigationDrawer />
        <TemporaryDrawer
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
        />
        <Outlet />
      </Stack>
    </LayoutBox>
  );
};

export default Layout;
