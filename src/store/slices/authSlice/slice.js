import { createSlice } from "@reduxjs/toolkit";
import { CLIENT_ID } from "~/constants";

let state = {
  isAuthenticated: false,
  accessToken: "",
  refreshToken: "",
  clientId: CLIENT_ID,
};

try {
  let temp = JSON.parse(localStorage.getItem("auth"));
  if (temp && Object.keys(state).every((key) => temp.hasOwnProperty(key)))
    state = temp;
} catch (e) {}

const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    authenticate: (state, action) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    unauthenticate: (state) => {
      state.isAuthenticated = false;
      state.accessToken = "";
      state.refreshToken = "";
    },
    appMode: (state, action) => {
      state.isAuthenticated = false;
      state.accessToken = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export default authSlice;
