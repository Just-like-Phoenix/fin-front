import { Logout, AccountCircle } from "@mui/icons-material";
import { Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { PopupState, bindMenu } from "material-ui-popup-state/hooks";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/authorization.service";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";

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
      <MenuItem
        onClick={popupState.close}
        onClickCapture={(e) => navigate("/profile")}
      >
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        Профиль
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={popupState.close}
        onClickCapture={(e) =>
          logout(Cookies.get("token") as string)
            .then((response) => {
              navigate("/");
            })
            .catch((thrown: AxiosError) => {
              console.log(thrown.response?.status);

              if (thrown.response?.status === 401)
                enqueueSnackbar(" ", { variant: "error" });

              if (thrown.response?.status === 500)
                enqueueSnackbar("Такая организация уже существует!", {
                  variant: "error",
                });

              if (thrown.response?.status === undefined)
                enqueueSnackbar("Сервер временно недоступен!", {
                  variant: "error",
                });
            })
        }
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
