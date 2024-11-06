"use server";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import * as z from "zod";

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SigninAction = async (_prevSate: any, formData: FormData) => {
  const rawData = Object.fromEntries(formData);
  const validatedData = signinSchema.safeParse(rawData);
  if (validatedData.error) {
    return {
      error: {
        formErrors: validatedData.error.flatten().formErrors,
        fieldErrors: validatedData.error.flatten().fieldErrors,
      },
      data: rawData,
    };
  }
  try {
    await signIn("credentials", { ...validatedData.data, redirect: false });
  } catch {
    const formErrors = { formErrors: "Email and password not match" };
    return { error: { formErrors }, data: rawData };
  }
  redirect("/");
};

const signupSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .regex(
        /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
        {
          message:
            "Should have 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and be at least 8 characters long",
        },
      ),
    password_confirm: z.string(),
  })
  .superRefine((val, ctx) => {
    if (val.password != val.password_confirm) {
      ctx.addIssue({
        path: ["password_confirm"],
        message: "Passwords not match",
        code: "custom",
      });
    }
  });
const SignupAction = async (_prevSate: any, formData: FormData) => {
  const rawData = Object.fromEntries(formData);
  const validated = signupSchema.safeParse(rawData);
  if (validated.error) {
    return {
      error: {
        fieldErrors: validated.error.flatten().fieldErrors,
        formErrors: validated.error.formErrors,
      },
      data: rawData,
    };
  }
  const res = await fetch(`${process.env.BACKEND_URL}/auth/signup/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validated.data),
  });
  if (res.ok) {
    await signIn("credentials", { ...validated.data, redirectTo: "/" });
  }
  const err = await res.json();
  const formErrors = JSON.stringify(err);
  return {
    error: {
      formErrors: formErrors,
      fieldErrors: { email: "", password: "", password_confirm: "" },
    },
    data: rawData,
  };
};

export { SigninAction, SignupAction };
