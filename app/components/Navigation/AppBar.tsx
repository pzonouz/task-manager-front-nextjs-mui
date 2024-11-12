"use sever";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";
import { auth } from "@/auth";
import AdbIcon from "@mui/icons-material/Adb";
import { MobileLogoAndName } from "./MobileLogo";
import { DesktopMenu } from "./DesktopMenu";
import { DesktopLogoAndName } from "./DesktopLogoAndName";

async function ResponsiveAppBar() {
  const pages = ["tasks", "projects", "blog"];
  const session = await auth();
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DesktopLogoAndName
            name={"task manager"}
            logo={
              <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            }
          />
          <MobileMenu pages={pages} />
          <MobileLogoAndName
            name={"Task Manager"}
            logo={
              <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            }
          />
          <DesktopMenu pages={pages} />
          <Box sx={{ flexGrow: 0 }}>
            <UserMenu session={session} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
