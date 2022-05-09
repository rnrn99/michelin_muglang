import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import restaurantReducer from "./restaurantSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    restaurant: restaurantReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
