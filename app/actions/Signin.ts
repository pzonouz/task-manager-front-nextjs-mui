"use server";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import * as z from "zod";

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
const Signin = async (_prevSate: any, formData: FormData) => {
  const rawData = Object.fromEntries(formData);
  const validatedData = signinSchema.safeParse(rawData);
  if (validatedData.error) {
    return { error: validatedData.error.flatten(), data: rawData };
  }
  try {
    await signIn("credentials", { ...validatedData.data, redirect: false });
  } catch (e) {
    const formErrors = { formErrors: "Email and password not match" };
    return { error: { formErrors }, data: rawData };
  }
  redirect("/");
};

export { Signin };
