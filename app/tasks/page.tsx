import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import AddTask from "../components/AddTask";
import { Task } from "../types/Task.type";

const page = async () => {
  const resTasks = await fetch(`${process.env.BACKEND_URL}/tasks`);
  const tasks: Task[] = await resTasks.json();
  const resCategories = await fetch(`${process.env.BACKEND_URL}/categories`);
  const categories = await resCategories.json();
  const resPriorities = await fetch(`${process.env.BACKEND_URL}/priorities`);
  const priorities = await resPriorities.json();
  return (
    <div>
      <AddTask categories={categories} priorities={priorities} />
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {tasks.map((task) => (
          <ListItem
            key={task?.id}
            secondaryAction={
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1rem",
                  padding: "1rem",
                }}
              >
                <IconButton edge="end">
                  <CheckIcon sx={{ color: "green", fontSize: "1.5rem" }} />
                </IconButton>

                <IconButton edge="end">
                  <DeleteIcon sx={{ color: "red", fontSize: "1.5rem" }} />
                </IconButton>
              </Box>
            }
            disablePadding
          >
            <ListItemButton role={undefined} dense>
              <ListItemText id={task?.id} primary={task?.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
export default page;
