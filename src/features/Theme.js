import { createSlice } from "@reduxjs/toolkit";

export const themeState = createSlice({
  name: "theme",
  initialState: {
    isDark: false,
  },
  reducers: {
    darkOrLight: (state, action) => {
      state.isDark = action.payload;
    },
  },
});

export const { darkOrLight } = themeState.actions;

export default themeState.reducer;
