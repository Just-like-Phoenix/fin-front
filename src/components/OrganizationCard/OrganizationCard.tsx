import {
  Button,
  Card,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import React from "react";
import { useNavigate } from "react-router-dom";

const OrganizationCard = ({
  regNum,
  orgName,
  orgEmail,
  orgAddress,
  userId,
}: {
  regNum: number;
  orgName: string;
  orgEmail: string;
  orgAddress: string;
  userId: string;
}) => {
  const navigate = useNavigate();

  return (
    <Card elevation={8} sx={{ margin: 2 }}>
      <Stack
        margin={2}
        spacing={2}
        direction={"row"}
        justifyContent={"space-between"}
      >
        <Stack>
          <Typography variant="h6">{orgName}</Typography>
          <List>
            <ListItem sx={{ padding: 0 }}>
              <ListItemText>Email:</ListItemText>
              <ListItemText>{orgEmail}</ListItemText>
            </ListItem>
            <ListItem sx={{ padding: 0 }}>
              <ListItemText>Адрес:</ListItemText>
              <ListItemText>{orgAddress}</ListItemText>
            </ListItem>
          </List>
        </Stack>

        <Stack spacing={2}>
          <Button
            variant="contained"
            onClick={(e) => navigate("/organizations/" + regNum)}
          >
            Просмотреть
          </Button>
          {Cookies.get("userId") === userId && (
            <Button
              variant="contained"
              color="info"
              onClick={(e) => navigate("/organizations/" + regNum)}
            >
              Изменить
            </Button>
          )}
          {Cookies.get("userId") === userId && (
            <Button
              variant="contained"
              color="error"
              onClick={(e) => navigate("/organizations/" + regNum)}
            >
              Удалить
            </Button>
          )}
        </Stack>
      </Stack>
    </Card>
  );
};

export default OrganizationCard;
