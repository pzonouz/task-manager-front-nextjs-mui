"use client";
import { AddCommentAction } from "@/app/actions/Comment";
import { TaskType } from "@/app/types/Task.type";
import { LoadingButton } from "@mui/lab";
import { Box, FormHelperText, TextField } from "@mui/material";
import { useActionState } from "react";

const CreateComment = ({ task }: { task: TaskType }) => {
  const [state, action, loading] = useActionState(AddCommentAction, null);
  return (
    <Box
      component="form"
      action={action}
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <input name="task" defaultValue={task?.id} hidden />
      <TextField
        name="text"
        defaultValue={state?.data?.text}
        variant="filled"
        multiline
        minRows={3}
        helperText={state?.error?.fieldErrors?.text?.[0]}
        error={!!state?.error?.fieldErrors?.text?.[0]}
      />
      {state?.error?.formErrors?.length! && (
        <FormHelperText error>
          {JSON.stringify(state?.error?.formErrors)}
        </FormHelperText>
      )}
      <LoadingButton loading={loading} type="submit" variant="contained">
        Add Comment
      </LoadingButton>
    </Box>
  );
};

export { CreateComment };
