import { Logout, AccountCircle } from "@mui/icons-material";
import { Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { PopupState, bindMenu } from "material-ui-popup-state/hooks";
import { useNavigate } from "react-router-dom";

const ProfileMenu = ({ popupState }: { popupState: PopupState }) => {
  const navigate = useNavigate();
  return (
    <Menu
      id="basic-menu"
      elevation={16}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      {...bindMenu(popupState)}
    >
      <MenuItem onClick={popupState.close}>
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        Профиль
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={popupState.close}
        onClickCapture={(e) => navigate("/login")}
      >
        <ListItemIcon>
          <Logout color="error" />
        </ListItemIcon>
        Выйти
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
