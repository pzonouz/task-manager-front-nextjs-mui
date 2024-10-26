"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import SignInPage from "@/app/components/SignInPage";

const page = async () => {
  const session = await auth();
  if (session?.user) {
    redirect("/profile");
  }
  return <SignInPage />;
};

export default page;
