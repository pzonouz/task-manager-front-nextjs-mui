import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { TaskType } from "../types/Task.type";
import { auth } from "@/auth";
import Link from "next/link";
import Task from "../components/Task/Task";

const page = async () => {
  const session = await auth();
  const resTasks = await fetch(`${process.env.BACKEND_URL}/tasks/`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${session?.access}`,
      "Content-Type": "application/json",
    },
  });
  const tasks: TaskType[] = await resTasks.json();
  const resCategories = await fetch(`${process.env.BACKEND_URL}/categories`);
  const categories = await resCategories.json();
  const resPriorities = await fetch(`${process.env.BACKEND_URL}/priorities`);
  const priorities = await resPriorities.json();
  // TODO:Percentage on fornt of each task
  // TODO:Days to due date inside of each task
  return (
    <div>
      <Typography variant="h4" sx={{ textAlign: "center", marginTop: "1rem" }}>
        Tasks
      </Typography>
      <Task categories={categories} priorities={priorities} />
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {tasks.map((task) => (
          <ListItem
            sx={[
              priorities?.[parseInt(task?.priority!) - 1]?.name == "High" && {
                background: "linear-gradient(to right, #f44336, #fff)",
              },
              priorities?.[parseInt(task?.priority!) - 1]?.name == "Medium" && {
                background: "linear-gradient(to right,#ff9800, #fff)",
              },
              priorities?.[parseInt(task?.priority!) - 1]?.name == "Low" && {
                background: "linear-gradient(to right, #3F51B5, #fff)",
              },
              { color: "white" },
            ]}
            key={task?.id}
            secondaryAction={
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "0.5rem",
                  padding: "1rem",
                }}
              >
                <IconButton
                  sx={{
                    color: "success.main",
                  }}
                  edge="end"
                >
                  <CheckIcon />
                </IconButton>
              </Box>
            }
            disablePadding
          >
            <ListItemButton
              component={Link}
              href={`/tasks/${task?.id}`}
              role={undefined}
              sx={{ padding: "1rem" }}
            >
              <ListItemText id={task?.id} primary={task?.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
export default page;
