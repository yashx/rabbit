import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import displayReducer from "./slices/displaySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    display: displayReducer,
  },
});

store.subscribe(() => {
  const { auth, display } = store.getState();
  localStorage.setItem("auth", JSON.stringify(auth));
  localStorage.setItem("display", JSON.stringify(display));
});

export default store;
