"use server";

import { auth } from "@/auth";
import { Box, Divider, IconButton, Paper, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import dayjs from "dayjs";
import { taskDeadlineToPercentColor } from "../page";
import { Comments } from "@/app/components/Comment/Comments";
import { Category } from "@/app/types/Category.type";
import { Prioirity } from "@/app/types/Priority.type";

const page = async ({ params }: { params: any }) => {
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
          },
        ]}
      >
        <Box>
          {
            categories?.find(
              (category: Category) => category?.id == task?.category,
            )?.name
          }
        </Box>
        <Box>
          {
            priorities?.find(
              (priority: Prioirity) => priority?.id == task?.priority,
            )?.name
          }
        </Box>
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
      <Divider />
      <Typography
        sx={{ textAlign: "center", fontSize: "0.8rem", marginY: "-1rem" }}
      >
        Comments
      </Typography>
      <Divider />
      <Comments task={task} />
    </Box>
  );
};
export default page;
