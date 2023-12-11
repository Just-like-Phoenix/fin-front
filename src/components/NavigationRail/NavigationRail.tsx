import { Drawer, styled } from "@mui/material";
import { RailList } from "./RailList";

const NavRail = styled(Drawer)(({ theme }) => ({
  zIndex: 0,
  width: 72,
  "@media (min-width: 600px)": {
    display: "block",
  },
  "@media (min-width: 1024px)": {
    display: "none",
  },
  display: "none",
}));

export const NavigationRail = () => {
  return (
    <NavRail variant="permanent" elevation={4}>
      <RailList />
    </NavRail>
  );
};
