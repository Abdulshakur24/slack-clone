import { createSlice } from "@reduxjs/toolkit";

export const sideSlide = createSlice({
  name: "status",
  initialState: {
    isSlideOpen: false,
  },
  reducers: {
    slideInAndOut: (state, action) => {
      state.isSlideOpen = action.payload;
    },
  },
});

export const { slideInAndOut } = sideSlide.actions;

export default sideSlide.reducer;
