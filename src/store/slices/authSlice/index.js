import { logIn, logOut, refreshAccessToken } from "./thunks";
import authSlice from "./slice";

export { logIn, logOut, refreshAccessToken };
export default authSlice.reducer;
