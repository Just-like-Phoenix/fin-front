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
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { styled } from "@mui/system";
import { MuiFileInput } from "mui-file-input";
import { indicatorCreate } from "../api/indicators.service";

const ICreateBox = styled(Box)(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

interface FormData {
  year: string;
  balanceFile: File;
  profitNLossFile: File;
  cashFlowFile: File;
}

const IndicatorCreatePage = () => {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ mode: "all" });
  const navigate = useNavigate();
  const [isLoad, setIsLoad] = useState(false);
  const { organizationID } = useParams();

  const convertBase64 = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result as unknown as string);
      };
    });
  };

  const onSubmit = async (data: FormData) => {
    setIsLoad(true);

    const b64balance = await convertBase64(data.balanceFile);
    const b64cashFlow = await convertBase64(data.cashFlowFile);
    const b64profitNLoss = await convertBase64(data.profitNLossFile);

    indicatorCreate(
      data.year,
      organizationID as string,
      b64balance,
      b64profitNLoss,
      b64cashFlow,
      Cookies.get("token") as string
    )
      .then((response) => {
        setIsLoad(false);
        navigate("/organizations/" + organizationID);
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
    <ICreateBox>
      <Card elevation={4} sx={{ width: 360, margin: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} margin={2}>
            <Typography align="center" variant="h5">
              Загрузка файлов
            </Typography>

            <Stack spacing={2}>
              <TextField
                label="Год"
                type="number"
                inputMode="numeric"
                onInput={(e) => {
                  var InputElement = e.target as HTMLInputElement;
                  InputElement.value = Math.max(0, parseInt(InputElement.value))
                    .toString()
                    .slice(0, 9);
                }}
                variant="outlined"
                error={!!errors.year}
                helperText={errors.year?.message}
                {...register("year", {
                  required: { value: true, message: "Ввeдите год!" },
                })}
              />

              <Controller
                name="balanceFile"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field, fieldState }) => (
                  <MuiFileInput
                    {...field}
                    inputProps={{ accept: ".xlsx, .xls" }}
                    label="Бухгалтерский баланс"
                    helperText={fieldState.invalid ? "Выбирете файл!" : ""}
                    error={fieldState.invalid}
                  />
                )}
              />

              <Controller
                name="profitNLossFile"
                control={control}
                render={({ field, fieldState }) => (
                  <MuiFileInput
                    {...field}
                    inputProps={{ accept: ".xlsx, .xls" }}
                    label="Отчет о прибылях и убытках"
                    helperText={fieldState.invalid ? "Выбирете файл!" : ""}
                    error={fieldState.invalid}
                  />
                )}
              />

              <Controller
                name="cashFlowFile"
                control={control}
                render={({ field, fieldState }) => (
                  <MuiFileInput
                    {...field}
                    inputProps={{ accept: ".xlsx, .xls" }}
                    label="Отчет о движении денежных средств"
                    helperText={fieldState.invalid ? "Выбирете файл!" : ""}
                    error={fieldState.invalid}
                  />
                )}
              />
            </Stack>

            <Stack
              spacing={2}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"end"}
            >
              <Button variant="contained" type="submit">
                Отправить
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
    </ICreateBox>
  );
};

export default IndicatorCreatePage;
