import { configureStore } from "@reduxjs/toolkit";
import filtersSlice from "../pages/TodoPage/Filters/filtersSlice";
import todoSlice from "../pages/TodoPage/TodoList/todoSlice";
import modeSlice from "../Themes/modeSlice";

const store = configureStore({
  reducer: {
    //--------- store of mode (light or dark) -----------
    mode: modeSlice.reducer,

    //--------- store of todo -------------
    filters: filtersSlice.reducer,
    todo: todoSlice.reducer,
  },
});

export default store;
