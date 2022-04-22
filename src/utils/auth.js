import axios from "axios";

export async function getAppOnlyAccessToken(clientId) {
  const params = new URLSearchParams();
  params.append(
    "grant_type",
    "https://oauth.reddit.com/grants/installed_client"
  );
  params.append("device_id", "DO_NOT_TRACK_THIS_DEVICE");

  const res = await axios.post(
    "https://www.reddit.com/api/v1/access_token",
    params,
    {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + window.btoa(clientId + ":" + ""),
      },
    }
  );
  if (res.data.access_token) {
    return res.data.access_token;
  } else {
    console.error("Unable to get App Access Token: ");
    console.error(res.data);
    return null;
  }
}

export async function getUserTokens(clientId, code, redirect_uri) {
  const params = new URLSearchParams();
  params.append("code", code);
  params.append("grant_type", "authorization_code");
  params.append("redirect_uri", redirect_uri);

  const res = await axios.post(
    "https://www.reddit.com/api/v1/access_token",
    params,
    {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + window.btoa(clientId + ":" + ""),
      },
    }
  );
  if (res.data.access_token && res.data.refresh_token) {
    return {
      accessToken: res.data.access_token,
      refreshToken: res.data.refresh_token,
    };
  } else {
    console.error("Unable to get User Tokens: ");
    console.error(res.data);
    return {
      accessToken: null,
      refreshToken: null,
    };
  }
}

export async function revokeRefreshToken(clientId, refreshToken) {
  const params = new URLSearchParams();
  params.append("token", refreshToken);
  params.append("token_type_hint", "refresh_token");

  await axios.post("https://www.reddit.com/api/v1/revoke_token", params, {
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + window.btoa(clientId + ":" + ""),
    },
  });
}

export async function getNewAccessToken(clientId, refreshToken) {
  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refreshToken);

  const res = await axios.post(
    "https://www.reddit.com/api/v1/access_token",
    params,
    {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + window.btoa(clientId + ":" + ""),
      },
    }
  );
  if (res.data.access_token) {
    return res.data.access_token;
  } else {
    console.error("Unable to refresh User Access Tokens: ");
    console.error(res.data);
    return null;
  }
}
