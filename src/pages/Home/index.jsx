import PostDetails from "./components/PostDetail";
import PostsMain from "./components/PostsMain";

function Home() {
  return (
    <div className="flex">
      <PostsMain />
      <PostDetails className="bg-red-400 w-2/3 h-screen" />
    </div>
  );
}

export default Home;
