"use client";
import { Box, Switch, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ControlButtons = () => {
  const params = useSearchParams();
  const router = useRouter();
  const currentCompleted = params.get("completed");
  const [completed, setCompleted] = useState(currentCompleted == "true");
  useEffect(() => {
    router.replace(`?completed=${completed}`);
  }, [completed]);

  return (
    <Box sx={{ padding: "1rem" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Typography>Completed</Typography>
        <Switch
          checked={completed}
          onChange={(e) => {
            setCompleted(e?.target?.checked);
          }}
        />
      </Box>
    </Box>
  );
};
export { ControlButtons };
