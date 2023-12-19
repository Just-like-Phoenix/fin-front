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
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { getIndicatorsByRegNumAndYear } from "../api/indicators.service";
import { IndicatorsByYearResponse } from "../types/indicators.type";

const IndicatorPage = () => {
  const navigate = useNavigate();
  const [isLoad, setIsLoad] = useState(false);
  const [indResponse, setIndResponse] = useState<IndicatorsByYearResponse>();
  const { organizationID, indicatorsID } = useParams();

  useEffect(() => {
    setIsLoad(true);

    getIndicatorsByRegNumAndYear(
      organizationID as string,
      indicatorsID as string
    )
      .then((response) => {
        console.log(response.data);
        setIndResponse(response.data);
        setIsLoad(false);
      })
      .catch((thrown: AxiosError) => {
        if (thrown.response?.status === undefined)
          enqueueSnackbar("Сервер временно недоступен", { variant: "error" });
        setIsLoad(false);
      });

    console.log(indResponse);
  }, []);

  return (
    <Stack
      direction={"column"}
      sx={{ width: "100%", margin: 2, height: "fit-content" }}
      spacing={2}
    >
      <Card sx={{ height: "fit-content" }}>
        <Stack margin={2} spacing={2}>
          <Typography variant="h5">Показатели ликвидности</Typography>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Текущая ликвидность</TableCell>
                <TableCell>
                  {indResponse?.liquidityIndicators.currentLiquidity}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Быстрая ликвидность</TableCell>
                <TableCell>
                  {indResponse?.liquidityIndicators.fastLiquidity}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Свободный денежный поток</TableCell>
                <TableCell>
                  {indResponse?.liquidityIndicators.freeCashFlow}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Оборачиваемость краткосрочной дебиторской задолженности
                </TableCell>
                <TableCell>
                  {indResponse?.liquidityIndicators.accountsRecTurnover}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Оборачиваемость запасов</TableCell>
                <TableCell>
                  {indResponse?.liquidityIndicators.reservesTurnover}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Оборачиваемость краткосрочной кредиторской задолженности
                </TableCell>
                <TableCell>
                  {indResponse?.liquidityIndicators.accountsPayTurnover}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Финансовый цикл текущего года</TableCell>
                <TableCell>
                  {indResponse?.liquidityIndicators.financialCycle}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Stack>
      </Card>
      <Card sx={{ height: "fit-content" }}>
        <Stack margin={2} spacing={2}>
          <Typography variant="h5">
            Показатели финансовой устойчивости
          </Typography>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Коэффициент финансового левереджа</TableCell>
                <TableCell>
                  {indResponse?.financialIndicators.leverage}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Коэффициент покрытия процентных выплат</TableCell>
                <TableCell>
                  {indResponse?.financialIndicators.coverageRatio}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Stack>
      </Card>
      <Card sx={{ height: "fit-content" }}>
        <Stack margin={2} spacing={2}>
          <Typography variant="h5">Показатели прибыльности</Typography>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Рентабельность активов</TableCell>
                <TableCell>
                  {indResponse?.profitabilityIndicators.returnOnAssets}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Рентабельность собственного капитала</TableCell>
                <TableCell>
                  {indResponse?.profitabilityIndicators.returnOnEquity}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Рентабельность инвестиций</TableCell>
                <TableCell>
                  {indResponse?.profitabilityIndicators.returnOnInvestment}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
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

export default IndicatorPage;
