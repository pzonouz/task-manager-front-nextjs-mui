"use client";
import { Box, Button } from "@mui/material";
import { usePathname } from "next/navigation";

const DesktopMenu = ({ pages }: { pages: string[] }) => {
  const path = usePathname();
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {pages.map((page) => {
        return (
          <Button
            key={page}
            sx={[
              `/${page}` == path
                ? {
                    backgroundColor: "white",
                    color: "primary.main",
                  }
                : {
                    color: "white",
                  },
              { my: 2, display: "block" },
            ]}
          >
            {page}
          </Button>
        );
      })}
    </Box>
  );
};
export { DesktopMenu };
