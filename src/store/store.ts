import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice";
import userSlice from "./features/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
