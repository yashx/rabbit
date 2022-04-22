import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logIn, logOut, refreshAccessToken } from "~/store/slices/authSlice";
import { fetchBestPosts } from "~/utils/api";

function Home() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  let [resp, setResp] = useState("No Data");

  const handleClick = () => {
    if (isAuth) dispatch(logOut());
    else dispatch(logIn());
  };

  const handleRefreshClick = () => {
    dispatch(refreshAccessToken());
  };

  const handleFetchClick = async () => {
    let data = await fetchBestPosts();
    setResp(data);
  };

  return (
    // <div className="h-screen w-screen flex justify-center items-center flex-col">
    <div>
      <h4>{"Access Token: " + accessToken}</h4>
      <div>
        <button
          className="bg-purple-500 p-2 mx-2 rounded"
          onClick={handleClick}
        >
          {isAuth ? "Logout" : "Login"}
        </button>
        <button
          className="bg-purple-500 p-2 rounded"
          onClick={handleRefreshClick}
        >
          Refresh Token
        </button>
        <button
          className="bg-purple-500 p-2 rounded"
          onClick={handleFetchClick}
        >
          Fetch Best Posts
        </button>
        <div>{JSON.stringify(resp)}</div>
      </div>
    </div>
  );
}

export default Home;
