import PostDetails from "./components/PostDetail";
import PostsMain from "./components/PostsMain";

import styles from "./index.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <PostsMain />
      <PostDetails />
    </div>
  );
}

export default Home;
