"use server";

import { auth } from "@/auth";
import dayjs from "dayjs";
import { Session } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";
const schema = z.object({
  id: z.string().nullish(),
  title: z.string().min(5),
  description: z.string().min(10),
  category: z.string().min(1),
  priority: z.string().min(1),
  due_date: z.string(),
  percentage: z.string().nullish(),
});
const AddTaskAction = async (_prevSate: any, formData: FormData) => {
  const rawData = Object.fromEntries(formData);
  const validated = schema.safeParse(rawData);
  if (validated.error) {
    return {
      error: {
        formErrors: validated.error.flatten().formErrors,
        fieldErrors: validated.error.flatten().fieldErrors,
      },
      data: rawData,
      success: false,
    };
  }
  const session: Session | null = await auth();
  validated.data.due_date = dayjs(validated.data.due_date).toISOString();
  const res = await fetch(`${process.env.BACKEND_URL}/tasks/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access}`,
      credentials: "include",
    },
    method: "POST",
    body: JSON.stringify(validated.data),
  });
  if (res.ok) {
    revalidatePath("/tasks");
    redirect("/tasks");
  }
  const err = await res.json();
  const formErrors = JSON.stringify(err);
  return {
    error: {
      formErrors: formErrors,
      fieldErrors: { title: null, description: null },
    },
    data: rawData,
  };
};

const EditTaskAction = async (_prevSate: any, formData: FormData) => {
  const rawData = Object.fromEntries(formData);
  const validated = schema.safeParse(rawData);
  if (validated.error) {
    return {
      error: {
        formErrors: validated.error.flatten().formErrors,
        fielsErrors: validated.error.flatten().fieldErrors,
      },
      data: rawData,
    };
  }
  validated.data.due_date = dayjs(validated.data.due_date).toISOString();
  const session: Session | null = await auth();
  const res = await fetch(
    `${process.env.BACKEND_URL}/tasks/${validated.data?.id}/`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access}`,
        credentials: "include",
      },
      method: "PATCH",
      body: JSON.stringify(validated.data),
    },
  );
  if (res.ok) {
    revalidatePath("/tasks");
    redirect(`/tasks/${validated.data?.id}`);
  }
  const err = await res.json();
  const formErrors = { formErrors: JSON.stringify(err) };
  return {
    error: { formErrors, fieldErrors: { title: null, description: null } },
    data: rawData,
  };
};
const CompleteTaskAction = async (_prevState: any, formData: FormData) => {
  const rawData = Object.fromEntries(formData);
  const session: Session | null = await auth();
  const res = await fetch(
    `${process.env.BACKEND_URL}/tasks/${rawData?.id}/complete`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access}`,
        credentials: "include",
      },
      method: "POST",
    },
  );
  if (res.ok) {
    revalidatePath("/tasks");
  }
};

export { AddTaskAction, EditTaskAction, CompleteTaskAction };
