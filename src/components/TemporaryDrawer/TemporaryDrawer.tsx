import { Drawer } from "@mui/material";
import React from "react";
import { TemporaryList } from "./TemporaryList";

const TemporaryDrawer = ({
  openDrawer,
  setOpenDrawer,
}: {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Drawer
      anchor="left"
      open={openDrawer}
      onClose={(e) => setOpenDrawer(false)}
    >
      <TemporaryList setOpenDrawer={setOpenDrawer} />
    </Drawer>
  );
};

export default TemporaryDrawer;
