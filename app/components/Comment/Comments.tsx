import { TaskType } from "@/app/types/Task.type";
import { CreateComment } from "./CreateComment";
import { CommentType } from "../../types/Comment.type";
import { Comment } from "@/app/components/Comment/Comment";
import { Box } from "@mui/material";

const Comments = ({ task }: { task: TaskType }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {task?.comments_full?.map((comment: CommentType) => (
        <Comment key={comment?.id} comment={comment} />
      ))}
      <CreateComment task={task} />
    </Box>
  );
};
export { Comments };
