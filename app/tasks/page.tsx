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
import { ControlButtons } from "../components/Navigation/ControlButtons";
import { Suspense } from "react";
import Loading from "../loading";
import dayjs from "dayjs";
import { CompleteTask } from "../components/Task/CompleteTask";

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const params = await searchParams;
  const keys = Object.keys(params);
  const fetchUrl = `${process.env.BACKEND_URL}/tasks/?${keys
    .map((key) => `${key}=${params[key]}`)
    .join("&")}`;
  const session = await auth();
  const resCategories = await fetch(`${process.env.BACKEND_URL}/categories`);
  const categories = await resCategories.json();
  const resPriorities = await fetch(`${process.env.BACKEND_URL}/priorities`);
  const priorities = await resPriorities.json();
  const resTasks = await fetch(fetchUrl, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${session?.access}`,
      "Content-Type": "application/json",
    },
  });
  const tasks: TaskType[] = await resTasks.json();
  // TODO:Percentage on fornt of each task
  // TODO:Days to due date inside of each task
  // TODO:Fix complete tasks strikes font
  // BUG:Fix color and hover in tasks and completed task
  const taskDeadline = (task: TaskType) =>
    (dayjs().unix() - dayjs(task?.created_at).unix()) /
    (dayjs(task?.due_date).unix() - dayjs(task?.created_at).unix());
  console.log(taskDeadline(tasks[0]));
  return (
    <div>
      <Typography variant="h4" sx={{ textAlign: "center", marginTop: "1rem" }}>
        Tasks
      </Typography>
      <ControlButtons />
      <Suspense key={params.completed as string} fallback={<Loading />}>
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
                      backgroundColor: `hsl(${
                        240 - 240 * taskDeadline(task)
                      },100%,50%)`,
                      "&:hover": {
                        backgroundColor: `hsl(${
                          240 - 240 * taskDeadline(task)
                        },100%,50%)`,
                      },
                      padding: "1rem",
                      overflow: "visible",
                    },
                    {
                      backgroundColor:
                        dayjs(task?.due_date).unix() - dayjs().unix() < 0
                          ? "black"
                          : null,
                      color:
                        dayjs(task?.due_date).unix() - dayjs().unix() < 0
                          ? "white"
                          : null,
                      "&:hover": {
                        backgroundColor:
                          dayjs(task?.due_date).unix() - dayjs().unix() < 0
                            ? "black"
                            : null,
                        color:
                          dayjs(task?.due_date).unix() - dayjs().unix() < 0
                            ? "white"
                            : null,
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
              </Box>
            </ListItem>
          ))}
        </List>
      </Suspense>
    </div>
  );
};
export default page;
