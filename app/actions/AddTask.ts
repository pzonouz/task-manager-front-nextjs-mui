"use server";

import { auth } from "@/auth";
import { Session } from "next-auth";
import { revalidatePath } from "next/cache";
import * as z from "zod";
const schema = z.object({
  title: z.string().min(5),
  description: z.string().min(10),
});
const AddTaskAction = async (
  _prevSate: {
    error: {
      fieldErrors: {
        title: string;
        description: string;
        category: number;
        priority: number;
        due_date: string;
      };
      formError: string;
    };
    data: {
      title: string;
      description: string;
      category: number;
      priority: number;
      due_date: string;
    };
    success: boolean;
  },
  formData: FormData,
) => {
  const rawData = Object.fromEntries(formData);
  const validated = schema.safeParse(rawData);
  if (validated.error) {
    return { error: validated.error.flatten(), data: rawData };
  }
  const session: Session | null = await auth();
  const res = await fetch(`${process.env.BACKEND_URL}/tasks/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access}`,
      // BUG:Override Session object
      //create next-auth.d.ts
      //import NextAuth from "next-auth";

      // declare module "next-auth" {
      //   interface Session {
      //     user: {
      //       /** Keep existing user properties */
      //       name?: string | null;
      //       email?: string | null;
      //       image?: string | null;
      //
      //       /** Add custom properties */
      //       userRole?: string;
      //       userId?: string;
      //     };
      //   }
      // }
      //
      //// tsconfig.json
      // {
      //   "compilerOptions": {
      //     // your existing options
      //   },
      //   "include": ["next-env.d.ts", "next-auth.d.ts", "**/*.ts", "**/*.tsx"]
      // }
      credentials: "include",
    },

    method: "POST",
    body: JSON.stringify(validated.data),
  });
  if (res.ok) {
    revalidatePath("/tasks");
    return { success: true, data: null };
  }
  const err = await res.json();
  const formErrors = JSON.stringify(err);
  return { error: { formErrors: formErrors, fieldErrors: {} }, data: rawData };
};

export { AddTaskAction };
