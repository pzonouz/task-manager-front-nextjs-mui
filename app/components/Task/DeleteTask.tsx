import { auth } from "@/auth";
import { Box, Button, Typography } from "@mui/material";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const DeleteTask = async (props: { id: string }) => {
  const session = await auth();
  return (
    <Box sx={{ marginTop: "5rem" }}>
      <Typography sx={{ textAlign: "center", fontSize: "2rem" }}>
        Are you sure?
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          marginTop: "2rem",
        }}
      >
        <Box
          component="form"
          action={async () => {
            "use server";
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${props.id}/`,
              {
                method: "DELETE",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `Bearer ${session?.access}`,
                },
              },
            );
            revalidatePath("/tasks");
            redirect("/tasks");
          }}
        >
          <Button type="submit" color="error" variant="contained">
            Yes
          </Button>
        </Box>
        <Box
          component="form"
          action={async () => {
            "use server";
            redirect(`/tasks/${props?.id}`);
          }}
        >
          <Button type="submit" variant="contained">
            No
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export { DeleteTask };
