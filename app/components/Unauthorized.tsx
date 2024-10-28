import { Box, Button } from "@mui/material";
import Link from "next/link";

const Unauthorized = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "error.main",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <Box sx={{ fontSize: "2rem", fontWeight: "bold" }}>Unauthorized</Box>
      <Button LinkComponent={Link} href="/signin" variant="contained">
        Signin
      </Button>
    </Box>
  );
};
export { Unauthorized };
