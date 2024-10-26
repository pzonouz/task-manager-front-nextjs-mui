"use client";

import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Category } from "../types/Category.type";
import { Prioirity } from "../types/Priority.type";

const AddTask = ({
  categories,
  priorities,
}: {
  categories: Category[];
  priorities: Prioirity[];
}) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <IconButton
        style={{ position: "fixed", right: "1rem", bottom: "1rem" }}
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          "&:hover": {
            bgcolor: "primary.dark",
          },
        }}
        onClick={() => setOpen(true)}
        size="large"
      >
        <AddIcon />
      </IconButton>
      <Modal
        sx={{ height: "100vh", width: "100vw" }}
        open={open}
        onClose={handleClose}
      >
        <Box
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
          <TextField name="title" label="Title" variant="standard" />
          <TextField
            name="description"
            label="Description"
            variant="standard"
          />
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              variant="standard"
              value={categories[0]?.id}
              label="Category"
              onChange={() => {}}
            >
              {categories.map((category) => (
                <MenuItem value={category?.id}>{category?.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              variant="standard"
              value={priorities[0]?.id}
              label="Priority"
              onChange={() => {}}
            >
              {priorities.map((priority) => (
                <MenuItem value={priority?.id}>{priority?.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
};
export default AddTask;
