import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActivePost } from "~/store/slices/displaySlice";
import { fetchPosts } from "~/utils/api";

function PostsMain(props) {
  const activePostRoute = useSelector((state) => state.display.activePostRoute);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let ps = await fetchPosts(activePostRoute);
      console.log(ps.data.children);
      setPosts(ps.data.children);
    })();
  }, [activePostRoute]);

  return (
    <div className={props.className}>
      <div className="overflow-y-scroll h-full w-full">
        {posts.map((post) => {
          return (
            <div
              className="bg-amber-300 my-2 p-4"
              onClick={() => {
                dispatch(setActivePost(post.data.id));
              }}
            >
              {post.data.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PostsMain;
