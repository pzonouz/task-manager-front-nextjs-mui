import { TaskType } from "@/app/types/Task.type";
import { late } from "@/app/utils";
import { Chip } from "@mui/material";

const ChipComponent = ({ label, task }: { label: string; task: TaskType }) => {
  return (
    <Chip
      size="small"
      sx={[
        {
          fontSize: "0.5rem",
          color: "black",
          borderColor: "black",
        },
        {
          backgroundColor: late(task?.due_date!) ? "black" : null,
          color: late(task?.due_date!) ? "white" : null,
          borderColor: late(task?.due_date!) ? "white" : null,
          "&:hover": {
            backgroundColor: late(task?.due_date!) ? "black" : null,
            color: late(task?.due_date!) ? "white" : null,
            borderColor: late(task?.due_date!) ? "white" : null,
          },
        },
      ]}
      variant="outlined"
      label={label}
    />
  );
};

export { ChipComponent };
