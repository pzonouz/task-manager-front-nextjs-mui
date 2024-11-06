"use server";

import { EditTask } from "@/app/components/Task/EditTask";
import { auth } from "@/auth";

const page = async ({ params }: { params: any }) => {
  const session = await auth();
  const parameters = await params;

  const resTask = await fetch(
    `${process.env.BACKEND_URL}/tasks/${parameters.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access}`,
      },
    },
  );
  const task = await resTask.json();
  const resCategory = await fetch(`${process.env.BACKEND_URL}/categories/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access}`,
    },
  });
  const categories = await resCategory.json();
  const resPriority = await fetch(`${process.env.BACKEND_URL}/priorities/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access}`,
    },
  });
  const priorities = await resPriority.json();
  return (
    <EditTask task={task} categories={categories} priorities={priorities} />
  );
};
export default page;
