"use client";

import { useSearchParams } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  return <div>{searchParams.get("error")}</div>;
};
export default page;
