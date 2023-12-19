import axios from "axios";
import { OrganizationResponse } from "../types/organization.type";

export const organizationCreate = (
  regNum: string,
  orgType: string,
  orgName: string,
  orgEmail: string,
  orgAddress: string,
  token: string
) => {
  return axios.post(
    "https://localhost:7273/organization/create",
    {
      regNum: regNum,
      orgType: orgType,
      orgName: orgName,
      orgEmail: orgEmail,
      orgAddress: orgAddress,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

export const getUserOrganizations = (token: string) => {
  return axios.post<OrganizationResponse[]>(
    "https://localhost:7273/organization/getByUser",
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

export const getAllOrganizations = () => {
  return axios.post<OrganizationResponse[]>(
    "https://localhost:7273/organization/getAll",
    {},
    {}
  );
};

export const getOrganizationByRegNum = (RegNum: string) => {
  return axios.get<OrganizationResponse[]>(
    "https://localhost:7273/organization/getByRegNum",
    {
      params: {
        RegNum: RegNum,
      },
    }
  );
};
