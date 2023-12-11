import { Drafts, Home } from "@mui/icons-material";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";

const ItemButton = styled(ListItemButton)(({ theme }) => ({
  flexDirection: "column",
  justifyContent: "center",
}));

const ItemIcon = styled(ListItemIcon)(({ theme }) => ({
  justifyContent: "center",
}));

export const RailList = () => {
  return (
    <List sx={{ width: 72, marginTop: 8 }}>
      <ItemButton>
        <ItemIcon>
          <Home fontSize="medium" />
        </ItemIcon>
        <ListItemText primary="Home" />
      </ItemButton>
      <ItemButton>
        <ItemIcon>
          <Drafts />
        </ItemIcon>
      </ItemButton>
    </List>
  );
};
