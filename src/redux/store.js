import { configureStore } from "@reduxjs/toolkit";
import filtersSlide from "../components/Filters/filtersSlide";
import todoSlide from "../components/TodoList/todoSlide";

const store = configureStore({
  reducer: {
    filters: filtersSlide.reducer,
    todo: todoSlide.reducer,
  },
});

export default store;
