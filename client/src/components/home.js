import React, { useState, useContext } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
// import Signup from "./sign-up";
import { authHeader, logOut, getUser } from "../services/auth";
import { UserContext } from "../UserContext";

function Home() {
  // const [currentUser, setCurrentUser] = useState(getUser());
  const { user, setUser } = useContext(UserContext);
  console.log("🚀 ~ file: home.js ~ line 10 ~ Home ~ user", user);
  const username = user && user.user.username;
  console.log("🚀 ~ file: home.js ~ line 12 ~ Home ~ username", username);
  const userID = user && user.user.id;

  return user ? (
    // if user already logged in, navigate to chat component
    <Redirect
      to={{
        pathname: `/chat/${user.user.userSlug}`,
        userInfo: { username, userID },
      }}
    />
  ) : (
    <Redirect to={"/sign-up"} />
    // <div className="cotainer vh-100">
    //   <h1 className="display-1">Welcome Hiya!</h1>
    //   <Link to={"/sign-up"}>
    //     <button className="btn btn-primary">Sign Up</button>
    //   </Link>
    // </div>
  );
}

export default Home;
