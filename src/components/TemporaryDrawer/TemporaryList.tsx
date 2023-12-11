import { Close, Home } from "@mui/icons-material";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";

const ItemButton = styled(ListItemButton)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "center",
}));

const ItemIcon = styled(ListItemIcon)(({ theme }) => ({
  justifyContent: "center",
}));

const ItemText = styled(ListItemText)(({ theme }) => ({}));

export const TemporaryList = ({
  setOpenDrawer,
}: {
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <List sx={{ width: 240 }}>
        <ItemButton onClick={(e) => setOpenDrawer(false)}>
          <ItemIcon>
            <Close />
          </ItemIcon>
        </ItemButton>
        <ItemButton>
          <ItemIcon>
            <Home fontSize="medium" />
          </ItemIcon>
          <ItemText primary="Главная" />
        </ItemButton>
        <ItemButton>
          <ItemIcon></ItemIcon>
          <ItemText primary="Rhz" />
        </ItemButton>
      </List>
    </>
  );
};
