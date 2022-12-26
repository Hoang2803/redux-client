import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../../config/api";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    loading: false,
    loadingUpdate: false,
    loadingCreate: false,
    loadingDelete: false,
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
      .addCase(createTodo.pending, (state, action) => {
        state.loadingCreate = true;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
        state.loadingCreate = false;
      })
      .addCase(updateTodo.pending, (state, action) => {
        state.loadingUpdate = true;
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
        state.loadingUpdate = false;
      })
      .addCase(deleteTodo.pending, (state, action) => {
        state.loadingDelete = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loadingDelete = false;
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

export const deleteTodo = createAsyncThunk("todo/deleteTodo", async (id) => {
  const res = await request.delete(`/todo/delete/${id}`);
  return res.data.todos;
});

export default todoSlice;
