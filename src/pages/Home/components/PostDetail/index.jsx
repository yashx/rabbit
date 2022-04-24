import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchPostComments } from "~/utils/api";

function PostDetail(props) {
  const activePost = useSelector((state) => state.display.activePost);
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
    <div className={props.className}>
      <div className="overflow-y-scroll h-full w-full">
        {comments.map((comment) => {
          return (
            <div className="bg-amber-300 my-2 p-4">{comment.data.body}</div>
          );
        })}
      </div>
    </div>
  );
}

export default PostDetail;
