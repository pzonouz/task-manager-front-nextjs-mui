import { DeleteTask } from "@/app/components/Task/DeleteTask";

const page = async ({ params }: { params: any }) => {
  const parameters = await params;
  return <DeleteTask id={parameters.id} />;
};
export default page;
