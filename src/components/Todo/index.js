import React, { useEffect, useState } from "react";

import {
  Checkbox,
  Chip,
  CircularProgress,
  FormControlLabel,
  Typography,
} from "@mui/material";

const Todo = ({ todo, handleChangeCheck, loading }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeChexBox = (completed, _id) => {
    handleChangeCheck(completed, _id);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!loading) setIsLoading(false);
  }, [loading]);

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

      {isLoading && <CircularProgress size={25} />}

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
