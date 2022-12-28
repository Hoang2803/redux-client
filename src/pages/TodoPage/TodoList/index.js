import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  List,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { createTodo, updateTodo } from "./todoSlice";
import { todosRemainingSelector } from "../../../redux/selectors/todoSelectors";
import { CustomPaper } from "../../../Themes/styles";
import { ShowWarning } from "../../../config/notistack";
import Theme from "../../../Themes";
import Todo from "../Todo";

const TodoList = () => {
  const [name, setName] = useState("");
  const [select, setSelect] = useState("Medium");

  // --------- redux -------------
  const dispatch = useDispatch();
  const { todoList, loading, loadingCreate, loadingUpdate, loadingDelete } =
    useSelector(todosRemainingSelector);

  const handleAddTodo = () => {
    if (name === "") {
      ShowWarning("Please enter todo before!"); // handle when user doesn't enter before adding
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

  // --------- handle when user update status (completed or todo) ------------
  const handleChangeCheck = (completed, _id) => {
    dispatch(updateTodo({ completed: !completed, id: _id }));
  };

  return (
    <CustomPaper sx={{ [Theme().breakpoints.down("sm")]: { padding: 0.5 } }}>
      <Box
        display="flex"
        gap={0.5}
        sx={{
          [Theme().breakpoints.down("sm")]: {
            flexDirection: "column",
          },
        }}
      >
        <Box
          width="60%"
          sx={{ [Theme().breakpoints.down("sm")]: { width: "100%" } }}
          minWidth={100}
        >
          <TextField
            fullWidth
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box flex={1} display="flex" gap={0.5}>
          <FormControl size="small" sx={{ width: "50%" }}>
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
          <Button
            variant="contained"
            sx={{ height: "38px", flex: 1 }}
            onClick={() => handleAddTodo()}
          >
            add
          </Button>
        </Box>
      </Box>

      <Box marginTop={1}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {todoList.map((todo, index) => {
              return (
                <Todo
                  key={todo._id ?? index}
                  todo={todo}
                  loadingUpdate={loadingUpdate}
                  loadingDelete={loadingDelete}
                  handleChangeCheck={handleChangeCheck}
                />
              );
            })}
          </List>
        )}

        {/* show progress when user create new todo (waiting system call api and update store) */}
        {loadingCreate && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress size={35} />
          </Box>
        )}
      </Box>
    </CustomPaper>
  );
};

export default TodoList;
