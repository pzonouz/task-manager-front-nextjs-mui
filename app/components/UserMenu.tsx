"use client";

import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import React from "react";

const UserMenu = ({ session }: { session: Session | null }) => {
  const router = useRouter();
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleSignOut = () => {
    setAnchorElUser(null);
    router.push("/signout");
  };
  const handleProfile = () => {
    setAnchorElUser(null);
    router.push("/profile");
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  console.log(session);
  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt={session?.user?.first_name!}
            src={session?.user?.image!}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {session?.user ? (
          <div>
            <MenuItem key={1} onClick={handleProfile}>
              <Typography sx={{ textAlign: "center" }}>Profile</Typography>
            </MenuItem>
            <MenuItem key={2} onClick={handleSignOut}>
              <Typography sx={{ textAlign: "center" }}>Signout</Typography>
            </MenuItem>
          </div>
        ) : (
          <MenuItem
            key={3}
            onClick={() => {
              setAnchorElUser(null);
              router.push("/signin");
            }}
          >
            <Typography sx={{ textAlign: "center" }}>Signin</Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default UserMenu;
