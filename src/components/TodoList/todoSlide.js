import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../config/api";

const todoSlide = createSlice({
  name: "todo",
  initialState: {
    loading: false,
    todos: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const newTodos = state.todos.map((todo) => {
          if (todo._id === action.payload._id) {
            return action.payload;
          } else {
            return todo;
          }
        });

        state.todos = newTodos;
      });
  },
});

export const getTodos = createAsyncThunk("todo/getTodos", async () => {
  const res = await request.get("/todo/show");
  return res.data.todos;
});

export const createTodo = createAsyncThunk(
  "todo/createTodo",
  async (todoInfo) => {
    const res = await request.post("/todo/create", todoInfo);
    return res.data.todo;
  }
);

export const updateTodo = createAsyncThunk(
  "todo/updateTodo",
  async (updateInfo) => {
    const res = await request.put(`/todo/update/${updateInfo.id}`, {
      completed: updateInfo.completed,
    });
    return res.data.todo;
  }
);

export default todoSlide;
