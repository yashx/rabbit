import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

store.subscribe(() => {
  const { auth } = store.getState();
  localStorage.setItem("auth", JSON.stringify(auth));
});

export default store;
