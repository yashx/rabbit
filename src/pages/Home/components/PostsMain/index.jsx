import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveRoute } from "~/store/slices/displaySlice";
import { fetchPosts } from "~/utils/api";
import Post from "../Post";

import styles from "./index.module.css";

function PostsMain() {
  const activePostRoute = useSelector((state) => state.display.activePostRoute);
  const [posts, setPosts] = useState([]);
  const [textInput, setTextInput] = useState(activePostRoute);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let ps = await fetchPosts(activePostRoute);
      console.log(ps.data.children);
      setPosts(ps.data.children);
    })();
  }, [activePostRoute]);

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.subreddit_input}
        placeholder="subreddit"
        value={textInput}
        onChange={(e) => {
          setTextInput(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") dispatch(setActiveRoute(textInput));
        }}
      />
      <div className={styles.posts_container}>
        {posts.map((post) => {
          return <Post data={post.data} key={post.data.id} compact={true} />;
        })}
      </div>
    </div>
  );
}

export default PostsMain;
