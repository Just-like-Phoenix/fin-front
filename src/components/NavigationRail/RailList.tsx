import { Domain, Home, Search } from "@mui/icons-material";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ItemButton = styled(ListItemButton)(({ theme }) => ({
  flexDirection: "column",
  justifyContent: "center",
}));

const ItemIcon = styled(ListItemIcon)(({ theme }) => ({
  justifyContent: "center",
}));

export const RailList = () => {
  const navigate = useNavigate();

  return (
    <List sx={{ width: 112, marginTop: 8 }}>
      <ItemButton onClick={(e) => navigate("/")}>
        <ItemIcon>
          <Home fontSize="medium" />
        </ItemIcon>
        <ListItemText primary="Главная" />
      </ItemButton>
      <ItemButton onClick={(e) => navigate("/organizations")}>
        <ItemIcon>
          <Domain fontSize="medium" />
        </ItemIcon>
        <ListItemText primary="Организации" />
      </ItemButton>
      <ItemButton onClick={(e) => navigate("/search")}>
        <ItemIcon>
          <Search fontSize="medium" />
        </ItemIcon>
        <ListItemText primary="Поиск" />
      </ItemButton>
    </List>
  );
};
