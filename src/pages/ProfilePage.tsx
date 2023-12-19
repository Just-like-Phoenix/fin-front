import {
  Backdrop,
  Button,
  Card,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserOrganizations } from "../api/organization.service";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { OrganizationResponse } from "../types/organization.type";
import Organizations from "../components/OrganizationsPage/Organizations";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isLoad, setIsLoad] = useState(false);
  const [orgResponse, setOrgResponse] = useState<OrganizationResponse[]>([]);

  useEffect(() => {
    setIsLoad(true);

    getUserOrganizations(Cookies.get("token") as string)
      .then((response) => {
        setOrgResponse(response.data);
        setIsLoad(false);
      })
      .catch((thrown: AxiosError) => {
        console.log(thrown.response?.status);

        if (thrown.response?.status === 401)
          enqueueSnackbar("401", { variant: "error" });

        if (thrown.response?.status === undefined)
          enqueueSnackbar("Сервер временно недоступен", { variant: "error" });
        setIsLoad(false);
      });
  }, []);

  return (
    <Stack
      direction={"column"}
      sx={{ width: "100%", margin: 2, height: "fit-content" }}
      spacing={2}
    >
      <Card sx={{ height: "fit-content" }}>
        <Stack margin={2} spacing={2}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="h5">Личные данные</Typography>
            <Button
              variant="contained"
              onClick={(e) => navigate("/profile/edit")}
            >
              Изменить
            </Button>
          </Stack>

          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Email :</TableCell>
                <TableCell>{Cookies.get("email")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ник :</TableCell>
                <TableCell>{Cookies.get("username")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Имя :</TableCell>
                <TableCell>{Cookies.get("firstName")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Фамилия :</TableCell>
                <TableCell>{Cookies.get("lastName")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Отчество :</TableCell>
                <TableCell>{Cookies.get("middleName")}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Stack>
      </Card>
      <Card>
        <Stack margin={2} spacing={2}>
          <Stack
            direction={"row"}
            spacing={2}
            margin={2}
            justifyContent={"space-between"}
          >
            <Typography variant="h5">Мои организации</Typography>
            <Button
              variant="contained"
              onClick={(e) => navigate("/organizations/create")}
            >
              Добавить
            </Button>
          </Stack>

          <Organizations
            organizations={orgResponse as OrganizationResponse[]}
          />
        </Stack>
      </Card>
      {isLoad && (
        <Backdrop open>
          <CircularProgress color="primary" />
        </Backdrop>
      )}
    </Stack>
  );
};

export default ProfilePage;
