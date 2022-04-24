import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchPosts } from "~/utils/api";
import Post from "./components/Post";

function PostsMain() {
  const activePostRoute = useSelector((state) => state.display.activePostRoute);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      let ps = await fetchPosts(activePostRoute);
      console.log(ps.data.children);
      setPosts(ps.data.children);
    })();
  }, [activePostRoute]);

  return (
    <div className="bg-gray-200 w-1/3 h-screen">
      <div className="overflow-y-scroll h-full w-full">
        {posts.map((post) => {
          return <Post data={post.data} key={post.data.name} />;
        })}
      </div>
    </div>
  );
}

export default PostsMain;
