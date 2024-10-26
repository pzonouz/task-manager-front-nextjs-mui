"use client";
import { Box, Button, Typography } from "@mui/material";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const signout = () => {
  const router = useRouter();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "3rem",
        maxWidth: "20rem",
        marginX: "auto",
        marginTop: "6rem",
      }}
    >
      <Typography
        sx={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold" }}
      >
        Are you Sure?
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            signOut({ redirectTo: "/signin" });
          }}
        >
          Yes
        </Button>
        <Button variant="contained" onClick={() => router.back()}>
          No
        </Button>
      </Box>
    </Box>
  );
};
export default signout;
