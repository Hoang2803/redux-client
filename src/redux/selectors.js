import { createSelector } from "@reduxjs/toolkit";

export const todoListSelector = (state) => state.todo.todos;
export const changeSearchFilterSelector = (state) => state.filters.search;
export const changeStatusFilterSelector = (state) => state.filters.status;
export const changePrioritiesFilterSelector = (state) =>
  state.filters.priorities;

export const todosRemainingSelector = createSelector(
  todoListSelector,
  changeSearchFilterSelector,
  changeStatusFilterSelector,
  changePrioritiesFilterSelector,
  (todoList, search, status, priorities) => {
    if (status === "all") {
      return todoList.filter((todo) =>
        priorities.length
          ? todo.name.toLowerCase().includes(search.toLowerCase()) &&
            priorities.includes(todo.priority)
          : todo.name.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      return todoList.filter((todo) =>
        priorities.length
          ? todo.name.toLowerCase().includes(search.toLowerCase()) &&
            (status === "completed" ? todo.completed : !todo.completed) &&
            priorities.includes(todo.priority)
          : todo.name.toLowerCase().includes(search.toLowerCase()) &&
            (status === "completed" ? todo.completed : !todo.completed)
      );
    }
  }
);
