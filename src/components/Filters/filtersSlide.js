import { createSlice } from "@reduxjs/toolkit";

const filtersSlide = createSlice({
  name: "filters",
  initialState: {
    search: "",
    status: "all",
    priorities: [],
  },
  reducers: {
    searchFilterChange: (state, action) => {
      state.search = action.payload;
    },
    statusFilterChange: (state, action) => {
      state.status = action.payload;
    },
    PriorityFilterChange: (state, action) => {
      state.priorities = action.payload;
    },
  },
});

export default filtersSlide;
