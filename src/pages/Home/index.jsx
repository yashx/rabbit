import PostDetails from "./components/PostDetail";
import PostsMain from "./components/PostsMain";

function Home() {
  return (
    <div className="flex">
      <PostsMain className="bg-green-500 w-1/3 h-screen" />
      <PostDetails className="bg-red-400 w-2/3 h-screen" />
    </div>
  );
}

export default Home;
