import { createSelector } from "@reduxjs/toolkit";

export const todoListSelector = (state) => ({
  todoList: state.todo.todos,
  loading: state.todo.loading,
  loadingUpdate: state.todo.loadingUpdate,
  loadingCreate: state.todo.loadingCreate,
  loadingDelete: state.todo.loadingDelete,
});
export const changeSearchFilterSelector = (state) => state.filters.search;
export const changeStatusFilterSelector = (state) => state.filters.status;
export const changePrioritiesFilterSelector = (state) =>
  state.filters.priorities;

export const todosRemainingSelector = createSelector(
  todoListSelector,
  changeSearchFilterSelector,
  changeStatusFilterSelector,
  changePrioritiesFilterSelector,
  (todos, search, status, priorities) => {
    if (status === "all") {
      return {
        todoList: todos.todoList.filter((todo) =>
          priorities.length
            ? todo.name.toLowerCase().includes(search.toLowerCase()) &&
              priorities.includes(todo.priority)
            : todo.name.toLowerCase().includes(search.toLowerCase())
        ),
        loading: todos.loading,
        loadingUpdate: todos.loadingUpdate,
        loadingCreate: todos.loadingCreate,
        loadingDelete: todos.loadingDelete,
      };
    } else {
      return {
        todoList: todos.todoList.filter((todo) =>
          priorities.length
            ? todo.name.toLowerCase().includes(search.toLowerCase()) &&
              (status === "completed" ? todo.completed : !todo.completed) &&
              priorities.includes(todo.priority)
            : todo.name.toLowerCase().includes(search.toLowerCase()) &&
              (status === "completed" ? todo.completed : !todo.completed)
        ),
        loading: todos.loading,
        loadingUpdate: todos.loadingUpdate,
        loadingCreate: todos.loadingCreate,
      };
    }
  }
);
