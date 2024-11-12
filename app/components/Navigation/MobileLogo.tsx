import AdbIcon from "@mui/icons-material/Adb";
import { Typography } from "@mui/material";
import Link from "next/link";

const MobileLogoAndName = ({ name, logo }: { name: string; logo: any }) => {
  return (
    <>
      {logo}
      <Typography
        variant="h5"
        noWrap
        component={Link}
        href="/"
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
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
export { MobileLogoAndName };
