import { createSlice } from "@reduxjs/toolkit";

export const sideSlide = createSlice({
  name: "status",
  initialState: {
    value: false,
  },
  reducers: {
    slideInAndOut: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { slideInAndOut } = sideSlide.actions;

export default sideSlide.reducer;
