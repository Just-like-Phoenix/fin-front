import { Drawer, styled } from "@mui/material";
import { DrawerList } from "./DrawerList";

const NavDrawer = styled(Drawer)(({ theme }) => ({
  zIndex: 0,
  width: 240,
  "@media (min-width: 1024px)": {
    display: "block",
  },
  display: "none",
}));

export const NavigationDrawer = () => {
  return (
    <NavDrawer variant="permanent" elevation={4}>
      <DrawerList />
    </NavDrawer>
  );
};
