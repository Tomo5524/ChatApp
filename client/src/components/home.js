import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
// import Signup from "./sign-up";
import { authHeader, logOut, getUser } from "../services/auth";

function Home() {
  const [currentUser, setCurrentUser] = useState(getUser());
  console.log("🚀 ~ file: home.js ~ line 8 ~ Home ~ currentUser", currentUser);
  const username = currentUser && currentUser.user.username;

  {
    /* <Redirect to={`/chat/${username}`} /> */
  }
  return currentUser ? (
    // if user already logged in, navigate to chat component
    <Redirect
      to={{
        pathname: "/:slug",
        props: { username },
      }}
    />
  ) : (
    <div className="cotainer">
      <h1 className="display-1">Welcome Hiya!</h1>
      <Link to={"/sign-up"}>
        <button className="btn btn-primary">Sign Up</button>
      </Link>
    </div>
  );
}

export default Home;
