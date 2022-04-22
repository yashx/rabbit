import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { logIn } from "~/store/slices/authSlice";

function RedditAuth() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const error = searchParams.get("error");
  const code = searchParams.get("code");

  if (isAuth) {
    return <Navigate replace to="/" />;
  } else if (error) {
    console.log("Error: " + error);
    return (
      <>
        <div>{error}</div>
        <Link className="text-blue-700 underline" to="/">
          Go to Home
        </Link>
      </>
    );
  } else if (code) {
    dispatch(logIn(code));
    return <div>Logging in...</div>;
  } else {
    return (
      <>
        <div>Only for Reddit Auth. Nothing to see here</div>
        <Link className="text-blue-700 underline" to="/">
          Go to Home
        </Link>
      </>
    );
  }
}

export default RedditAuth;
