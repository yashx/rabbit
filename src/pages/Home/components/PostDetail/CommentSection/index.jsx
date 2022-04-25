import React, { useEffect, useState } from "react";
import { fetchPostComments } from "~/utils/api";

import styles from "./index.module.css";

function CommentSection({ activePost }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async () => {
      if (activePost) {
        let res = await fetchPostComments(activePost.id);
        console.log(res);
        setComments(res.data.children);
      }
    })();
  }, [activePost]);

  return (
    <div className={styles.comments_container}>
      {comments.map((comment) => {
        return <div className={styles.comment}>{comment.data.body}</div>;
      })}
    </div>
  );
}

export default CommentSection;
