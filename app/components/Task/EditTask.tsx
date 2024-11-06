"use client";

import { LoadingButton } from "@mui/lab";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { ReactNode, useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TaskType } from "@/app/types/Task.type";
import { Category } from "@/app/types/Category.type";
import { Prioirity } from "@/app/types/Priority.type";
import { EditTaskAction } from "@/app/actions/Task";

const EditTask = ({
  task,
  categories,
  priorities,
}: {
  task: TaskType;
  categories: Category[];
  priorities: Prioirity[];
}) => {
  const [state, action, loading] = useActionState(EditTaskAction, null);
  return (
    <Box
      component="form"
      action={action}
      sx={{
        width: "90%",
        backgroundColor: "white",
        position: "absolute",
        top: "50%",
        left: "50%",
        padding: "2rem",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <input type="text" hidden name="id" defaultValue={task?.id} />
      <Typography sx={{ textAlign: "center" }} variant="h6" component="h2">
        Edit Task
      </Typography>
      <TextField
        helperText={state?.error?.fieldErrors?.title}
        error={!!state?.error?.fieldErrors?.title}
        name="title"
        label="Title"
        variant="standard"
        defaultValue={task?.title}
      />
      <TextField
        helperText={state?.error?.fieldErrors?.description}
        error={!!state?.error?.fieldErrors?.description}
        name="description"
        label="Description"
        variant="standard"
        defaultValue={task?.description}
      />
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          name="category"
          variant="standard"
          defaultValue={task.category}
          label="Category"
        >
          {categories.map((category) => (
            <MenuItem key={category?.id} value={category?.id}>
              {category?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Priority</InputLabel>
        <Select
          name="priority"
          variant="standard"
          defaultValue={task.priority}
          label="Priority"
        >
          {priorities.map((priority) => (
            <MenuItem key={priority?.id} value={priority?.id}>
              {priority?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <DateTimePicker
        slots={{
          textField: ({ ...props }) => <TextField {...props} error={false} />,
        }}
        defaultValue={dayjs(task?.due_date)}
        name="due_date"
        label="Due Date"
      />
      <Slider
        name="percentage"
        shiftStep={30}
        step={10}
        marks
        min={10}
        max={110}
        defaultValue={task.percentage}
      />
      {state?.error?.formErrors && (
        <FormHelperText error>
          {state?.error?.formErrors as ReactNode}
        </FormHelperText>
      )}
      <LoadingButton type="submit" variant="contained" loading={loading}>
        Edit Task
      </LoadingButton>
    </Box>
  );
};
export { EditTask };
