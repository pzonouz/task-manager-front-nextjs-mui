import {
  Box,
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";
import Task from "../components/Task/Task";
import { ControlButtons } from "../components/Navigation/ControlButtons";
import { CompleteTask } from "../components/Task/CompleteTask";
import {
  getData,
  late,
  taskDeadline,
  taskDeadlineToPercentColor,
} from "../utils";
import { ChipComponent } from "../components/Shared/ChipComponent";

const page = async ({ searchParams }: { searchParams: any }) => {
  const params = await searchParams;
  const { tasks, categories, priorities } = await getData(params);
  return (
    <div>
      <Typography variant="h4" sx={{ textAlign: "center", marginTop: "1rem" }}>
        Tasks
      </Typography>
      <ControlButtons />
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
                <CompleteTask task={task} />
              </Box>
            }
            disablePadding
          >
            <Box
              component={Link}
              href={`/tasks/${task?.id}`}
              sx={{
                width: "100%",
                ":active": {
                  backgroundColor: "white",
                },
              }}
            >
              <ListItemButton
                role={undefined}
                sx={[
                  {
                    width: `${taskDeadline(task)}`,
                    backgroundColor: taskDeadlineToPercentColor(task),
                    "&:hover": {
                      backgroundColor: taskDeadlineToPercentColor(task),
                    },
                    padding: "1rem",
                    overflow: "visible",
                  },
                  {
                    backgroundColor: late(task?.due_date!) ? "black" : null,
                    color: late(task?.due_date!) ? "white" : null,
                    "&:hover": {
                      backgroundColor: late(task?.due_date!) ? "black" : null,
                      color: late(task?.due_date!) ? "white" : null,
                    },
                  },
                  {
                    backgroundColor: task?.completed ? "white" : null,
                    color: task?.completed ? "black" : null,
                  },
                ]}
              >
                <ListItemText
                  sx={{ textWrap: "nowrap", minWidth: "10rem" }}
                  id={task?.id}
                  primary={`${task?.title}`}
                />
              </ListItemButton>
              <Box
                sx={[
                  {
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    color: "black",
                    gap: "0.5rem",
                    position: "absolute",
                    top: "50%",
                    right: "4rem",
                    transform: "translate(0,-50%)",
                  },
                ]}
              >
                <ChipComponent
                  key={task?.id}
                  label={task?.category_full?.name!}
                  task={task}
                />
                <ChipComponent
                  key={task?.id}
                  label={task?.priority_full?.name!}
                  task={task}
                />
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
export default page;
export { taskDeadline, taskDeadlineToPercentColor };
