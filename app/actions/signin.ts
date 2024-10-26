"use client";
import { signIn } from "next-auth/react";
import * as z from "zod";

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
const signin = async (_prevSate: any, formData: FormData) => {
  const rawData = Object.fromEntries(formData);
  const validatedData = signinSchema.safeParse(rawData);
  if (validatedData.error) {
    return { error: validatedData.error.flatten() };
  }
  await signIn("credentials", validatedData.data, {
    redirect: false,
  });
};

export { signin };
