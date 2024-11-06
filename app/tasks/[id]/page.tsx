"use server";

import { auth } from "@/auth";
import { Box, IconButton, LinearProgress, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";
import dayjs from "dayjs";
import { taskDeadlineToPercentColor } from "../page";

const page = async ({ params }: { params: { id: number } }) => {
  const parameters = await params;
  const session = await auth();
  const resTask = await fetch(
    `${process.env.BACKEND_URL}/tasks/${parameters.id}/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access}`,
      },
    },
  );
  const task = await resTask.json();
  const resCategories = await fetch(`${process.env.BACKEND_URL}/categories`);
  const categories = await resCategories.json();
  const resPriorities = await fetch(`${process.env.BACKEND_URL}/priorities`);
  const priorities = await resPriorities.json();
  const dateTime = dayjs(task?.due_date);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "2rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "0.5rem",
          justifyContent: "end",
        }}
      >
        <IconButton
          component={Link}
          href={`/tasks/${task?.id}/edit`}
          sx={{
            color: "primary.main",
          }}
          edge="end"
        >
          <EditIcon />
        </IconButton>

        <IconButton
          component={Link}
          href={`/tasks/${task?.id}/delete`}
          edge="end"
          sx={{
            color: "error.main",
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>

      <Paper
        elevation={2}
        sx={[
          {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "1rem",
            color: "white",
            backgroundColor: taskDeadlineToPercentColor(task),
            // backgroundColor: "black",
          },
        ]}
      >
        <Box>{categories?.[task.category - 1]?.name}</Box>
        <Box>{priorities?.[task.priority - 1]?.name}</Box>
      </Paper>
      <Paper elevation={2} sx={{ padding: "1rem" }}>
        {task.title}
      </Paper>
      <Paper elevation={2} sx={{ padding: "1rem" }}>
        {task.description}
      </Paper>
      <Paper elevation={2} sx={{ padding: "1rem" }}>
        {dateTime.get("D")}-{dateTime.get("M")}-{dateTime.get("year")}
        {"---"}
        {dateTime.get("h")}:{dateTime.get("minute")}
      </Paper>
      <Paper
        elevation={2}
        sx={{
          padding: "1rem",
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
        }}
      >
        <Box>{task?.percentage}%</Box>
        <LinearProgress
          sx={{ flex: 1 }}
          variant="determinate"
          // defaultValue={task?.percentage}
          value={task?.percentage}
          valueBuffer={task?.percentage}
          color="secondary"
        />
      </Paper>
    </Box>
  );
};
export default page;
