import { configureStore } from "@reduxjs/toolkit";
import classSlice from "features/class/classSlice";
import userSlice from "features/user/userSlice";

export const store = configureStore({
  reducer: {
    class: classSlice,
    user: userSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;