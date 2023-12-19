import { Card, Pagination, Stack } from "@mui/material";
import React, { useState } from "react";
import usePagination from "../../hooks/usePagination";
import OrganizationCard from "../OrganizationCard/OrganizationCard";
import { IndicatorsResponse } from "../../types/indicators.type";
import IndicatorsCard from "../IndicatorsCard/IndicatorsCard";

const Indicators = ({ indicators }: { indicators: IndicatorsResponse[] }) => {
  let [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const count = Math.ceil(indicators.length / PER_PAGE);
  const _DATA = usePagination(indicators, PER_PAGE);

  return (
    <Stack>
      {_DATA.currentData().map((e: any) => (
        <IndicatorsCard Year={e.year} />
      ))}
      <Stack display={"flex"} alignItems={"center"}>
        <Pagination
          count={count}
          size="large"
          page={page}
          variant="outlined"
          onChange={(e, p) => {
            setPage(p);
            _DATA.jump(p);
          }}
        />
      </Stack>
    </Stack>
  );
};

export default Indicators;
