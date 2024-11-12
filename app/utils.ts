import dayjs from "dayjs";
import { TaskType } from "./types/Task.type";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const taskDeadline = (task: TaskType) =>
  (dayjs().unix() - dayjs(task?.created_at).unix()) /
  (dayjs(task?.due_date).unix() - dayjs(task?.created_at).unix());

const taskDeadlineToPercentColor = (task: TaskType) => {
  if (dayjs(task?.due_date).unix() - dayjs().unix() > 0) {
    return `hsl(${240 - 240 * taskDeadline(task)},100%,50%)`;
  } else {
    return "black";
  }
};

const getData = async (params: any) => {
  const keys = Object.keys(params);
  if (!keys.includes("completed")) {
    redirect("/tasks?completed=false");
  }
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
  return { tasks, categories, priorities };
};
const late = (due_date: string) => {
  return dayjs().unix() > dayjs(due_date).unix();
};

export { taskDeadline, taskDeadlineToPercentColor, getData, late };
