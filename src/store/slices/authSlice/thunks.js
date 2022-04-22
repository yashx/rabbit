import { ACCESS_SCOPES, REDIRECT_URI } from "~/constants";
import {
  getAppOnlyAccessToken,
  getUserTokens,
  revokeRefreshToken,
  getNewAccessToken,
} from "~/utils/auth";
import authSlice from "./slice";

const logIn = (authCode) => async (dispatch, getState) => {
  console.log("Login");
  const { auth } = getState();

  if (authCode) {
    let tokens = await getUserTokens(auth.clientId, authCode, REDIRECT_URI);
    if (tokens.accessToken && tokens.refreshToken) {
      dispatch(authSlice.actions.authenticate(tokens));
      console.log("Logged In");
    } else {
      console.error("Log In failed. Access Token not received.");
    }
  } else {
    let clientId = auth.clientId;
    let state = "befb7bfb-a7a1-4951-8f97-dde5a056159d";
    let duration = "permanent";
    let scope = ACCESS_SCOPES;

    window.open(
      `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=code&state=${state}&redirect_uri=${REDIRECT_URI}&duration=${duration}&scope=${scope}`,
      "_self"
    );
  }
};

const logOut = () => async (dispatch, getState) => {
  const { auth } = getState();
  await revokeRefreshToken(auth.clientId, auth.refreshToken);
  dispatch(authSlice.actions.unauthenticate());

  let accessToken = await getAppOnlyAccessToken(auth.clientId);
  dispatch(authSlice.actions.appMode(accessToken));
};

const refreshAccessToken = () => async (dispatch, getState) => {
  const { auth } = getState();
  let accessToken;
  if (auth.isAuthenticated) {
    accessToken = await getNewAccessToken(auth.clientId, auth.refreshToken);
  } else {
    accessToken = await getAppOnlyAccessToken(auth.clientId);
  }
  dispatch(authSlice.actions.setAccessToken(accessToken));
};

export { logIn, logOut, refreshAccessToken };
