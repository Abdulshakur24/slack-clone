import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../features/appSlice";
import slideReducer from "../features/SlideStatus";
import themeReducer from "../features/Theme";

export default configureStore({
  reducer: {
    app: appReducer,
    slideState: slideReducer,
    theme: themeReducer,
  },
});
