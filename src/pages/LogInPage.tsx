import {
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signIn } from "../api/authorization.service";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

const LogInBox = styled(Box)(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

interface FormData {
  email: string;
  password: string;
}

const LogInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();
  const [isLoad, setIsLoad] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsLoad(true);

    signIn(data.email, data.password)
      .then((response) => {
        setIsLoad(false);
        console.log(response.data);
        Cookies.set("email", response.data.email, { expires: 30 });
        Cookies.set("username", response.data.username, { expires: 30 });
        Cookies.set("firstName", response.data.firstName, { expires: 30 });
        Cookies.set("lastName", response.data.lastName, { expires: 30 });
        Cookies.set("middleName", response.data.middleName, { expires: 30 });
        Cookies.set("token", response.data.token, { expires: 0.12 });
        Cookies.set("refreshToken", response.data.refreshToken, {
          expires: 30,
        });
        localStorage.setItem("isLogin", "true");
        navigate("/");
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
    <LogInBox>
      <Card elevation={4} sx={{ width: 360, margin: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} margin={2}>
            <Typography align="center" variant="h5">
              Вход
            </Typography>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email", {
                required: { value: true, message: "Ввeдите Email!" },
                pattern: {
                  value:
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                  message: "Введите email в формате name@example.com",
                },
              })}
            />
            <TextField
              label="Пароль"
              type="password"
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password", {
                required: { value: true, message: "Ввeдите пароль!" },
                minLength: { value: 8, message: "Ввeдите пароль!" },
              })}
            />
            <Stack
              spacing={2}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Button variant="text" onClick={(e) => navigate("/register")}>
                Создать аккаунт
              </Button>
              <Button variant="contained" type="submit">
                Войти
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
    </LogInBox>
  );
};

export default LogInPage;
