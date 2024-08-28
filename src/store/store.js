import { configureStore } from "@reduxjs/toolkit";
import keyboard from "./slices/keyboardSlice";

export const store = configureStore({
  reducer: { keyboard },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(),
  devTools: process.env.NODE_ENV !== "production",
});
