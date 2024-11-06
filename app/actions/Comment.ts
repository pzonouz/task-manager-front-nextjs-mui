"use server";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";

const schema = z.object({
  task: z.string().nullish(),
  text: z.string().min(1),
});
const AddCommentAction = async (_prevState: any, formData: FormData) => {
  const rawData = Object.fromEntries(formData);
  const validatedData = schema.safeParse(rawData);
  if (validatedData.error) {
    return {
      error: {
        formErrors: validatedData.error.flatten().formErrors,
        fieldErrors: validatedData.error.flatten().fieldErrors,
      },
      data: rawData,
    };
  }
  const session: Session | null = await auth();
  const res = await fetch(`${process.env.BACKEND_URL}/comments/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access}`,
      credentials: "include",
    },
    method: "POST",
    body: JSON.stringify(rawData),
  });
  if (res.ok) {
    revalidatePath(`/tasks/${rawData?.task_id}`);
    redirect(`/tasks/${rawData?.task_id}`);
  }
  const err = await res.json();
  const error = { formErrors: err, fieldErrors: { text: "" } };
  return { error, data: rawData };
};
const EditCommentAction = async (id: string, commentText: string) => {
  const session: Session | null = await auth();
  const res = await fetch(`${process.env.BACKEND_URL}/comments/${id}/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access}`,
      credentials: "include",
    },
    method: "PATCH",
    body: JSON.stringify({ text: commentText }),
  });
  if (res.ok) {
    revalidatePath(`/tasks/${id}`);
    return { success: true };
  }
  const err = await res.json();
  return new Error(JSON.stringify(err));
};
const DeleteCommentAction = async (id: string) => {
  const session: Session | null = await auth();
  const res = await fetch(`${process.env.BACKEND_URL}/comments/${id}/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access}`,
      credentials: "include",
    },
    method: "DELETE",
  });
  if (res.ok) {
    revalidatePath(`/tasks/${id}`);
    return { success: true };
  }
  const err = await res.json();
  return new Error(JSON.stringify(err));
};

export { AddCommentAction, EditCommentAction, DeleteCommentAction };
