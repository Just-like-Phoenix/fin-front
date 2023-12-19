import { Card, Pagination, Stack } from "@mui/material";
import React, { useState } from "react";
import { OrganizationResponse } from "../../types/organization.type";
import usePagination from "../../hooks/usePagination";
import OrganizationCard from "../OrganizationCard/OrganizationCard";

const Organizations = ({
  organizations,
}: {
  organizations: OrganizationResponse[];
}) => {
  let [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const count = Math.ceil(organizations.length / PER_PAGE);
  const _DATA = usePagination(organizations, PER_PAGE);

  return (
    <Stack>
      {_DATA.currentData().map((e: OrganizationResponse) => (
        <OrganizationCard
          regNum={e.regNum}
          orgName={e.orgName}
          orgEmail={e.orgEmail}
          orgAddress={e.orgAddress}
          userId={e.applicationUserId}
        />
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

export default Organizations;
