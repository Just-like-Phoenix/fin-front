import {
  Backdrop,
  Card,
  CircularProgress,
  Pagination,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import OrganizationCard from "../components/OrganizationCard/OrganizationCard";
import { getAllOrganizations } from "../api/organization.service";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { OrganizationResponse } from "../types/organization.type";
import usePagination from "../hooks/usePagination";
import Organizations from "../components/OrganizationsPage/Organizations";

const OrganizationsPage = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [orgResponse, setOrgResponse] = useState<OrganizationResponse[]>([]);

  useEffect(() => {
    setIsLoad(true);

    getAllOrganizations()
      .then((response) => {
        setOrgResponse(response.data);
        setIsLoad(false);
      })
      .catch((thrown: AxiosError) => {
        console.log(thrown.response?.status);

        if (thrown.response?.status === undefined)
          enqueueSnackbar("Сервер временно недоступен", { variant: "error" });
        setIsLoad(false);
      });
  }, []);

  return (
    <Card sx={{ width: "100%", margin: 2, height: "fit-content" }}>
      <Stack margin={2}>
        <Organizations organizations={orgResponse as OrganizationResponse[]} />
      </Stack>
      {isLoad && (
        <Backdrop open>
          <CircularProgress color="primary" />
        </Backdrop>
      )}
    </Card>
  );
};

export default OrganizationsPage;
