import { createSlice } from "@reduxjs/toolkit";

const modeSlice = createSlice({
  name: "mode",
  initialState: {
    type: "light",
  },
  reducers: {
    changeMode: (state, action) => {
      state.type = action.payload;
    },
  },
});

export default modeSlice;
