import { createSlice } from "@reduxjs/toolkit";

export const themeState = createSlice({
  name: "theme",
  initialState: {
    value: false,
  },
  reducers: {
    darkOrLight: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { darkOrLight } = themeState.actions;

export default themeState.reducer;
