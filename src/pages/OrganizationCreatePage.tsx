import styled from "@emotion/styled";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { organizationCreate } from "../api/organization.service";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";

const OCreateBox = styled(Box)(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

interface FormData {
  regNum: string;
  orgType: string;
  orgName: string;
  orgEmail: string;
  orgAddress: string;
}

const OrganizationCreatePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "all" });
  const navigate = useNavigate();
  const [isLoad, setIsLoad] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsLoad(true);

    organizationCreate(
      data.regNum,
      data.orgType,
      data.orgName,
      data.orgEmail,
      data.orgAddress,
      Cookies.get("token") as string
    )
      .then((response) => {
        setIsLoad(false);
        navigate("/profile");
      })
      .catch((thrown: AxiosError) => {
        console.log(thrown.response?.status);

        if (thrown.response?.status === 401)
          enqueueSnackbar("401", { variant: "error" });

        if (thrown.response?.status === undefined)
          enqueueSnackbar("Сервер временно недоступен", { variant: "error" });
        setIsLoad(false);
      });
  };

  return (
    <OCreateBox>
      <Card elevation={4} sx={{ width: 360, margin: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} margin={2}>
            <Typography align="center" variant="h5">
              Создание организации
            </Typography>

            <Stack spacing={2}>
              <TextField
                label="УНП"
                type="number"
                inputMode="numeric"
                onInput={(e) => {
                  var InputElement = e.target as HTMLInputElement;
                  InputElement.value = Math.max(0, parseInt(InputElement.value))
                    .toString()
                    .slice(0, 9);
                }}
                variant="outlined"
                error={!!errors.regNum}
                helperText={errors.regNum?.message}
                {...register("regNum", {
                  required: { value: true, message: "Ввeдите УНП!" },
                  minLength: {
                    value: 9,
                    message: "УНП должен состоять из 9 цифр!",
                  },
                })}
              />
              <Select
                type="text"
                defaultValue={"private"}
                {...register("orgType")}
              >
                <MenuItem value={"private"}>Частная</MenuItem>
                <MenuItem value={"public"}>Государственная</MenuItem>
              </Select>
              <TextField
                label="Название"
                type="text"
                variant="outlined"
                error={!!errors.orgName}
                helperText={errors.orgName?.message}
                {...register("orgName", {
                  required: { value: true, message: "Ввeдите название!" },
                })}
              />
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                error={!!errors.orgEmail}
                helperText={errors.orgEmail?.message}
                {...register("orgEmail", {
                  required: { value: true, message: "Ввeдите Email!" },
                  pattern: {
                    value:
                      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                    message: "Введите email в формате name@example.com",
                  },
                })}
              />
              <TextField
                label="Адрес"
                type="text"
                variant="outlined"
                error={!!errors.orgAddress}
                helperText={errors.orgAddress?.message}
                {...register("orgAddress", {
                  required: { value: true, message: "Ввeдите адрес!" },
                })}
              />
            </Stack>

            <Stack
              spacing={2}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"end"}
            >
              <Button variant="contained" type="submit">
                Создать
              </Button>
            </Stack>
          </Stack>
        </form>
      </Card>
      {isLoad && (
        <Backdrop open>
          <CircularProgress color="primary" />
        </Backdrop>
      )}
    </OCreateBox>
  );
};

export default OrganizationCreatePage;
