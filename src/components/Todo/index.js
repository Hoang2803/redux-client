import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteTodo } from "../TodoList/todoSlide";

const Todo = ({ todo, handleChangeCheck, loadingUpdate, loadingDelete }) => {
  const [open, setOpen] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeChexBox = (completed, _id) => {
    handleChangeCheck(completed, _id);
    setIsLoadingUpdate(true);
  };

  useEffect(() => {
    if (!loadingUpdate) setIsLoadingUpdate(false);
  }, [loadingUpdate]);

  useEffect(() => {
    if (!loadingDelete) setIsLoadingDelete(false);
  }, [loadingDelete]);

  const handleDeleteTodo = () => {
    dispatch(deleteTodo(todo._id));
    handleClose();
    setIsLoadingDelete(true);
  };

  return (
    <div className="todo-item">
      <FormControlLabel
        control={
          <Checkbox
            checked={todo.completed ?? false}
            onChange={() => handleChangeChexBox(todo.completed, todo._id)}
          />
        }
        label={
          <Typography
            sx={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.name ?? ""}
          </Typography>
        }
      />

      {isLoadingUpdate || (isLoadingDelete && <CircularProgress size={25} />)}

      <div className="todo-item-control">
        <div className="todo-priority">
          <Chip
            label={
              <Typography
                sx={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.priority ?? ""}
              </Typography>
            }
            color={
              todo.priority === "High"
                ? "warning"
                : todo.priority === "Medium"
                ? "info"
                : "default"
            }
          />
        </div>
        <IconButton onClick={() => setOpen(true)}>
          <DeleteForeverIcon color={"secondary"} />
        </IconButton>
      </div>

      <Dialog
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"confirm delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this todo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Disagree</Button>
          <Button onClick={() => handleDeleteTodo()} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Todo;
