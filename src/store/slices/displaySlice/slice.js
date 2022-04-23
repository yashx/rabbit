import { createSlice } from "@reduxjs/toolkit";

let state = {
  activePostRoute: "/r/aww/best",
  activePost: null,
};

try {
  let temp = JSON.parse(localStorage.getItem("display"));
  if (temp && Object.keys(state).every((key) => temp.hasOwnProperty(key)))
    state = temp;
  state.activePost = null;
} catch (e) {}

const displaySlice = createSlice({
  name: "display",
  initialState: state,
  reducers: {
    setActiveRoute: (state, action) => {
      state.activePostRoute = action.payload;
    },
    setActivePost: (state, action) => {
      state.activePost = action.payload;
    },
  },
});

export default displaySlice;
