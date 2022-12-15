import { Checkbox, Chip, FormControlLabel, Typography } from "@mui/material";
import React from "react";

const Todo = ({ todo, handleChangeCheck }) => {
  return (
    <div className="todo-item">
      <FormControlLabel
        control={
          <Checkbox
            checked={todo.completed ?? false}
            onChange={() => handleChangeCheck(todo.completed, todo._id)}
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
      <Chip
        label={
          <Typography
            sx={{ textDecoration: todo.completed ? "line-through" : "none" }}
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
  );
};

export default Todo;
