import { Route, Routes } from "react-router-dom";
import Home from "~/pages/Home";
import RedditAuth from "./pages/RedditAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/redditAuth" element={<RedditAuth />} />
    </Routes>
  );
}

export default App;
