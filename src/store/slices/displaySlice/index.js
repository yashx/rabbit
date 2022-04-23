import displaySlice from "./slice";

let setActiveRoute = displaySlice.actions.setActiveRoute;
let setActivePost = displaySlice.actions.setActivePost;

export { setActiveRoute, setActivePost };

export default displaySlice.reducer;
