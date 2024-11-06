"use client";
import { CommentType } from "@/app/types/Comment.type";
import {
  IconButton,
  InputAdornment,
  Input,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { DeleteCommentAction, EditCommentAction } from "@/app/actions/Comment";

const Comment = ({ comment }: { comment: CommentType }) => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [snackBarText, setSnackBarText] = useState("");
  const [commentValue, setCommentValue] = useState(comment?.text);
  const [severity, setSeverity] = useState<"success" | "error">("success");

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpen(false);
          }}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackBarText}
        </Alert>
      </Snackbar>
      <Input
        multiline
        value={commentValue}
        onChange={(e) => {
          setCommentValue(e.currentTarget.value);
          if (e.currentTarget.value == comment?.text) {
            setEdit(false);
            return;
          }
          setEdit(true);
        }}
        endAdornment={
          <InputAdornment position="end">
            {edit && (
              <IconButton
                onClick={() => {
                  EditCommentAction(comment?.id, commentValue)
                    .then(() => {
                      setSeverity("success");
                      setSnackBarText("Comment Updated");
                      setOpen(true);
                      setEdit(false);
                    })
                    .catch(() => {
                      setSeverity("error");
                      setSnackBarText("ServerError");
                      setOpen(true);
                      setEdit(false);
                    });
                }}
              >
                <EditIcon color="primary" />
              </IconButton>
            )}
            <IconButton
              onClick={() => {
                DeleteCommentAction(comment?.id);
              }}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </InputAdornment>
        }
      />
    </>
  );
};

export { Comment };
