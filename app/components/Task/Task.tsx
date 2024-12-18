"use client";

import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useActionState, useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { Category } from "@/app/types/Category.type";
import { Prioirity } from "@/app/types/Priority.type";
import { AddTaskAction } from "@/app/actions/Task";
import { ModalWithState } from "../Shared/ModalWithState";

const Task = ({
  categories,
  priorities,
}: {
  categories: Category[];
  priorities: Prioirity[];
}) => {
  const [state, action, loading] = useActionState(AddTaskAction, null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (state?.success) {
      setOpen(false);
    }
  }, [state]);
  return (
    <ModalWithState state={open} setState={setOpen}>
      <Box
        component="form"
        action={action}
        sx={{
          width: "80%",
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
        <Typography sx={{ textAlign: "center" }} variant="h6" component="h2">
          Add Task
        </Typography>
        <TextField
          helperText={state?.error?.fieldErrors?.title?.[0]}
          error={!!state?.error?.fieldErrors?.title?.[0]}
          name="title"
          label="Title"
          variant="standard"
          defaultValue={state?.data?.title}
        />
        <TextField
          helperText={state?.error?.fieldErrors?.description?.[0]}
          error={!!state?.error?.fieldErrors?.description?.[0]}
          name="description"
          label="Description"
          variant="standard"
          defaultValue={state?.data?.description}
        />
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            variant="standard"
            defaultValue={categories[0]?.id}
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
            defaultValue={priorities[0]?.id}
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
            textField: ({ ...params }) => (
              <TextField {...params} error={false} />
            ),
          }}
          disablePast
          defaultValue={dayjs(state?.data?.due_date.toString()) || dayjs()}
          name="due_date"
          label="Due Date"
        />
        {state?.error?.formErrors?.length! && (
          <FormHelperText error>{state?.error?.formErrors}</FormHelperText>
        )}
        <LoadingButton type="submit" variant="contained" loading={loading}>
          Add Task
        </LoadingButton>
      </Box>
    </ModalWithState>
  );
};
export default Task;
