import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./features/events/eventSlice.ts";

export const store = configureStore({
  reducer: {
    event: eventReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
