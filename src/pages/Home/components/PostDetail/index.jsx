import React from "react";
import { useSelector } from "react-redux";
import Post from "../Post";
import CommentSection from "./CommentSection";

import styles from "./index.module.css";

function PostDetail() {
  const activePost = useSelector((state) => state.display.activePost);

  if (!activePost) return;

  console.log(activePost);

  return (
    <div className={styles.container}>
      <Post data={activePost} compact={false} />
      <CommentSection activePost={activePost} />
    </div>
  );
}

export default PostDetail;
