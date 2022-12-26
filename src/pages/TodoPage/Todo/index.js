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
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteTodo } from "../TodoList/todoSlice";
import Theme from "../../../Themes";
import { BoxChip } from "../style";

const Todo = ({ todo, handleChangeCheck, loadingUpdate, loadingDelete }) => {
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenConfirmDelete(false);
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

  // ---------- handle when user delete a todo ----------
  const handleDeleteTodo = () => {
    dispatch(deleteTodo(todo._id));
    handleClose();
    setIsLoadingDelete(true);
  };

  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton
            onClick={() => setOpenConfirmDelete(true)}
            sx={{ [Theme().breakpoints.down("sm")]: { display: "none" } }}
          >
            <DeleteForeverIcon color={"secondary"} />
          </IconButton>
        }
        sx={{ [Theme().breakpoints.down("sm")]: { padding: 0 } }}
      >
        <ListItemIcon>
          <Checkbox
            checked={todo.completed ?? false}
            onChange={() => handleChangeChexBox(todo.completed, todo._id)}
          />
        </ListItemIcon>
        <ListItemText
          primary={todo.name ?? ""}
          sx={{
            textDecoration: todo.completed ? "line-through" : "none",
          }}
        />

        {/* show progress when user update status or delete a todo (waiting system call api and update store) */}
        {isLoadingUpdate && <CircularProgress size={25} />}
        {isLoadingDelete && <CircularProgress size={25} />}

        <BoxChip>
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
        </BoxChip>
      </ListItem>
      <Dialog
        open={openConfirmDelete}
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
    </>
  );
};

export default Todo;
