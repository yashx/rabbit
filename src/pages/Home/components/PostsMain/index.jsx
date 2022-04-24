import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveRoute } from "~/store/slices/displaySlice";
import { fetchPosts } from "~/utils/api";
import Post from "./components/Post";

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
    <div className="bg-gray-200 w-1/3 h-screen flex flex-col">
      <input
        type="text"
        className="w-full h-12 p-2"
        placeholder="subreddit"
        value={textInput}
        onChange={(e) => {
          setTextInput(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") dispatch(setActiveRoute(textInput));
        }}
      />
      <div className="overflow-y-scroll h-full flex-grow">
        {posts.map((post) => {
          return <Post data={post.data} key={post.data.name} />;
        })}
      </div>
    </div>
  );
}

export default PostsMain;
