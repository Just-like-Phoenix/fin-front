export type IndicatorsResponse = {
  year: string;
  regNum: string;
  organization: any;
  liquidityIndicatorsId: string;
  liquidityIndicators: any;
  financialIndicatorsId: string;
  financialIndicators: any;
  profitabilityIndicatorsId: string;
  profitabilityIndicators: any;
};

export type IndicatorsByYearResponse = {
  liquidityIndicators: {
    id: string;
    currentLiquidity: number;
    fastLiquidity: number;
    freeCashFlow: number;
    accountsRecTurnover: number;
    reservesTurnover: number;
    accountsPayTurnover: number;
    financialCycle: number;
  };
  financialIndicators: {
    id: string;
    leverage: number;
    coverageRatio: number;
  };
  profitabilityIndicators: {
    id: string;
    returnOnAssets: number;
    returnOnEquity: number;
    returnOnInvestment: number;
  };
};
