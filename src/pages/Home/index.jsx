import { useSelector, useDispatch } from "react-redux";
import { logIn, logOut, refreshAccessToken } from "~/store/slices/authSlice";

function Home() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (isAuth) dispatch(logOut());
    else dispatch(logIn());
  };

  const handleRefreshClick = () => {
    dispatch(refreshAccessToken());
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col">
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
      </div>
    </div>
  );
}

export default Home;
