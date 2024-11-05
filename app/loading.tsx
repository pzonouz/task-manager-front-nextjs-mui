import { Skeleton } from "@mui/material";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "80vh",
        width: "100%",
        margin: "3rem auto",
        gap: "1rem",
      }}
    >
      <Skeleton variant="rectangular" sx={{ width: "100%", height: "4rem" }} />
      <Skeleton variant="rectangular" sx={{ width: "100%", height: "4rem" }} />
      <Skeleton variant="rectangular" sx={{ width: "100%", height: "4rem" }} />
      <Skeleton variant="rectangular" sx={{ width: "100%", height: "4rem" }} />
      <Skeleton variant="rectangular" sx={{ width: "100%", height: "4rem" }} />
      <Skeleton variant="rectangular" sx={{ width: "100%", height: "4rem" }} />
      <Skeleton variant="rectangular" sx={{ width: "100%", height: "4rem" }} />
      <Skeleton variant="rectangular" sx={{ width: "100%", height: "4rem" }} />
    </div>
  );
}
