import { Typography } from "@mui/material";
import Link from "next/link";

const DesktopLogoAndName = ({ name, logo }: { name: string; logo: any }) => {
  return (
    <>
      {logo}
      <Typography
        variant="h6"
        noWrap
        component={Link}
        href="/"
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        {name}
      </Typography>
    </>
  );
};

export { DesktopLogoAndName };
