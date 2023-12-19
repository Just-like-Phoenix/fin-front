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
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { OrganizationResponse } from "../types/organization.type";
import { getOrganizationByRegNum } from "../api/organization.service";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { getIndicatorsByRegNum } from "../api/indicators.service";
import { IndicatorsResponse } from "../types/indicators.type";
import Indicators from "../components/IndicatorsPage/Indicators";

const OrganizationPage = () => {
  const navigate = useNavigate();
  const [isLoad, setIsLoad] = useState(false);
  const [orgResponse, setOrgResponse] = useState<OrganizationResponse>();
  const [indResponse, setIndResponse] = useState<IndicatorsResponse[]>([]);
  const { organizationID } = useParams();

  useEffect(() => {
    setIsLoad(true);

    getOrganizationByRegNum(organizationID as string)
      .then((response) => {
        console.log(response);
        setOrgResponse(response.data[0]);
        setIsLoad(false);
      })
      .catch((thrown: AxiosError) => {
        if (thrown.response?.status === undefined)
          enqueueSnackbar("Сервер временно недоступен", { variant: "error" });
        setIsLoad(false);
      });
  }, []);

  useEffect(() => {
    setIsLoad(true);

    getIndicatorsByRegNum(organizationID as string)
      .then((response) => {
        console.log(response);
        setIndResponse(response.data);
        setIsLoad(false);
      })
      .catch((thrown: AxiosError) => {
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
            <Typography variant="h5">Данные организации</Typography>
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
                <TableCell>Название :</TableCell>
                <TableCell>{orgResponse?.orgName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>УНП :</TableCell>
                <TableCell>{organizationID}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Email :</TableCell>
                <TableCell>{orgResponse?.orgEmail}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Адрес :</TableCell>
                <TableCell>{orgResponse?.orgAddress}</TableCell>
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
            <Typography variant="h5">Оценки организации</Typography>
            <Button
              variant="contained"
              onClick={(e) => navigate("indicators/create")}
            >
              Добавить
            </Button>
          </Stack>
          <Indicators indicators={indResponse as IndicatorsResponse[]} />
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

export default OrganizationPage;
