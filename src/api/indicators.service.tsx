import axios from "axios";
import {
  IndicatorsByYearResponse,
  IndicatorsResponse,
} from "../types/indicators.type";

export const indicatorCreate = (
  year: string,
  regNum: string,
  balanceFile: string,
  profitNLossFile: string,
  cashFlowFile: string,
  token: string
) => {
  return axios.post(
    "https://localhost:7273/organization/indicators/create",
    {
      year: year,
      regNum: regNum,
      balanceFile: balanceFile,
      profitNLossFile: profitNLossFile,
      cashFlowFile: cashFlowFile,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

export const getIndicatorsByRegNum = (RegNum: string) => {
  return axios.get<IndicatorsResponse[]>(
    "https://localhost:7273/organization/indicators/getByRegNum",
    {
      params: {
        RegNum: RegNum,
      },
    }
  );
};

export const getIndicatorsByRegNumAndYear = (RegNum: string, Year: string) => {
  return axios.get<IndicatorsByYearResponse>(
    "https://localhost:7273/organization/indicators/getByRegNumAndYear",
    {
      params: {
        RegNum: RegNum,
        Year: Year,
      },
    }
  );
};
