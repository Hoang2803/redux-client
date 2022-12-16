import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import "./Todo.css";
import { useDispatch, useSelector } from "react-redux";

import { createTodo, updateTodo } from "./todoSlide";
import { todosRemainingSelector } from "../../redux/selectors";
import Todo from "../Todo";

const TodoList = () => {
  const [name, setName] = useState("");
  const [select, setSelect] = useState("Medium");

  const dispatch = useDispatch();
  const { todoList, loading } = useSelector(todosRemainingSelector);

  const handleAddTodo = () => {
    if (name === "") {
      window.alert("nhap todo di!");
    } else {
      dispatch(
        createTodo({
          name,
          priority: select,
          completed: false,
        })
      );
      setName("");
      setSelect("Medium");
    }
  };

  const handleChangeCheck = (completed, _id) => {
    dispatch(updateTodo({ completed: !completed, id: _id }));
  };

  return (
    <div className="todo-container">
      <div className="todo-control">
        <div className="todo-input">
          <TextField
            fullWidth
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="todo-select">
          <FormControl fullWidth size="small">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={select}
              onChange={(e) => setSelect(e.target.value)}
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="todo-add">
          <Button
            variant="contained"
            sx={{ height: "38px" }}
            fullWidth
            onClick={() => handleAddTodo()}
          >
            add
          </Button>
        </div>
      </div>

      <div className="todo-content">
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          todoList.map((todo, index) => {
            return (
              <Todo
                key={todo._id ?? index}
                todo={todo}
                index={index}
                handleChangeCheck={handleChangeCheck}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default TodoList;
