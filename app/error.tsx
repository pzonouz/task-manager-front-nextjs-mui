"use client";

import { Button } from "@mui/material";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        width: "80%",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        gap: "4rem",
        textAlign: "center",
      }}
    >
      <h2>{error.message}</h2>
      <Button onClick={() => reset()} variant="contained">
        Try again
      </Button>
    </div>
  );
}
