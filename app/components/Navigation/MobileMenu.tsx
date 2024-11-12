"use client";
import MenuIcon from "@mui/icons-material/Menu";

import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MobileMenu = ({ pages }: { pages: string[] }) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const path = usePathname();
  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          {pages.map((page) => (
            <MenuItem
              sx={[`/${page}` == path && { backgroundColor: grey[200] }]}
              key={page}
              component={Link}
              href={`/${page}`}
            >
              <Typography sx={{ textAlign: "center" }}>{page}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </>
  );
};

export default MobileMenu;
