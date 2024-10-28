"use client";

import { IconButton, Modal } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

const ModalWithState = ({
  state,
  setState,
  children,
}: {
  state: boolean;
  setState: any;
  children: any;
}) => {
  const handleClose = () => {
    setState(false);
  };

  return (
    <>
      <IconButton
        style={{ position: "fixed", right: "1rem", bottom: "1rem" }}
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          "&:hover": {
            bgcolor: "primary.dark",
          },
        }}
        onClick={() => setState(true)}
        size="large"
      >
        <AddIcon />
      </IconButton>
      <Modal
        sx={{ height: "100vh", width: "100vw" }}
        open={state}
        onClose={handleClose}
      >
        {children}
      </Modal>
    </>
  );
};

export { ModalWithState };
