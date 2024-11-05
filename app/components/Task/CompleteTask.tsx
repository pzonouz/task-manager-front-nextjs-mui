"use client";
import { TaskType } from "@/app/types/Task.type";
import { CircularProgress, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useActionState, useEffect } from "react";
import { CompleteTaskAction } from "@/app/actions/Task";

const CompleteTask = ({ task }: { task: TaskType }) => {
  const [_, action, loading] = useActionState(CompleteTaskAction, null);
  return (
    <form action={action}>
      <input hidden name="id" defaultValue={task?.id} />
      <IconButton
        component="button"
        type="submit"
        sx={{
          color: "success.main",
          backgroundColor: "white",
        }}
        edge="end"
      >
        {loading ? (
          <CircularProgress size={20} sx={{ color: "success.main" }} />
        ) : (
          <CheckIcon />
        )}
      </IconButton>
    </form>
  );
};
export { CompleteTask };
