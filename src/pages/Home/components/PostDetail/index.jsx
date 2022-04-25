import React from "react";
import { useSelector } from "react-redux";
import CommentSection from "./CommentSection";

import styles from "./index.module.css";

function PostDetail() {
  const activePost = useSelector((state) => state.display.activePost);

  return (
    <div className={styles.container}>
      <CommentSection activePost={activePost} />
    </div>
  );
}

export default PostDetail;
