import axios from "axios";
import store from "~/store";
import { refreshAccessToken } from "~/store/slices/authSlice";

const RedditClient = axios.create({
  baseURL: "https://oauth.reddit.com/",
});

RedditClient.interceptors.request.use(async (config) => {
  let { auth } = store.getState();
  config.headers = {
    Authorization: `Bearer ${auth.accessToken}`,
  };
  return config;
});

RedditClient.interceptors.response.use(
  (resp) => resp,
  async (err) => {
    const req = err.config;
    if (err.response.status == 401 && !req._retry) {
      req._retry = true;
      await store.dispatch(refreshAccessToken());
      return RedditClient(req);
    }
    return Promise.reject(err);
  }
);

export async function fetchBestPosts() {
  let res = await RedditClient.get("/best");
  return res.data;
}
