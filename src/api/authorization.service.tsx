import axios from "axios";
import { SignInResponse } from "../types/authorization.type";
import Cookies from "js-cookie";

export const signIn = (email: string, password: string) => {
  return axios.post<SignInResponse>("https://localhost:7273/accounts/login", {
    email: email,
    password: password,
  });
};

export const signUp = (
  email: string,
  password: string,
  passwordConfirm: string,
  firstName: string,
  lastName: string,
  middleName: string
) => {
  return axios.post("https://localhost:7273/accounts/register", {
    email: email,
    userName: email,
    password: password,
    passwordConfirm: passwordConfirm,
    firstName: firstName,
    lastName: lastName,
    middleName: middleName,
  });
};

export const logout = (token: string) => {
  Cookies.remove("email");
  Cookies.remove("username");
  Cookies.remove("firstName");
  Cookies.remove("lastName");
  Cookies.remove("middleName");
  Cookies.remove("token");
  Cookies.remove("refreshToken");
  Cookies.remove("userId");
  localStorage.removeItem("isLogin");

  return axios.post(
    "https://localhost:7273/accounts/logout",
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
};
