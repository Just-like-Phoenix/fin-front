import axios from "axios";
import { SignInResponse } from "../types/authorization.type";

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

export const logout = (email: string, password: string) => {
  return axios.post("https://localhost:7273/accounts/logout", {
    email: email,
    password: password,
  });
};
