import React, { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../UserContext";

function Login() {
  const { user, setUser } = useContext(UserContext);
  const [username, settUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setError] = useState("");
  let history = useHistory();
  // const ENDPOINT = "http://localhost:5000";
  const ENDPOINT = "https://mern-caht-app.herokuapp.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit/////////");
    try {
      const res = await fetch(`${ENDPOINT}/api/login`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Connection: "keep-alive",
          credentials: "include",
        },
        body: JSON.stringify({ username, password }),
      });
      const currentUser = await res.json();
      // const userInfo = {
      //   userSlug: currentUser.user.userSlug,
      //   username: currentUser.user.username,
      //   _id: currentUser.user._id,
      // };
      if (currentUser.token) {
        // currentUser holds these values below
        // currentUser = {joinedDate: "May 13, 2021"
        // password: "example"
        // userSlug: "example"
        // username: "example"
        // _id: "609ca3e049f28e0004134375"}
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        setUser(currentUser);
        // navigate user to room component
        history.push(`/chat/${currentUser.user.userSlug}`);
        // window.location.reload();
      } else {
        setError(currentUser.message);
        error.current.classList.add("display");
        setTimeout(() => {
          error.current.classList.remove("display");
        }, 2000);
      }
    } catch (e) {
      // debug porpuse
      console.log(e);
    }
  };

  let error = useRef(); // grab html element

  return (
    <div className="container mid-break-margin h-90vh">
      <div className="col-md-8 col-lg-6 mx-auto">
        <form onSubmit={handleSubmit} className="box p-4">
          <h1>Login</h1>
          <p className="text-muted">Please enter your login and password!</p>
          <input
            type="text"
            name="username"
            onChange={(e) => settUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <input type="submit" value="Login" />
          <div ref={error} className="error-container d-block pb-4">
            <h3 className="m-0">{errMessage}</h3>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
