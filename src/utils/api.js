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

export async function fetchPosts(route) {
  let res = await RedditClient.get(route);
  return res.data;
}

export async function fetchPostComments(postId) {
  let res = await RedditClient.get(`/comments/${postId}`);
  return res.data[1];
}
