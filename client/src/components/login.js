import React, { useState, useRef, useContext } from "react";
// import renderHTML from "react-render-html";
// import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { UserContext } from "../UserContext";

function Login() {
  const { user, setUser } = useContext(UserContext);
  const [username, settUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setError] = useState("");
  let history = useHistory();
  const ENDPOINT = "https://mern-caht-app.herokuapp.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit/////////");
    // const res = await fetch(`${baseURL}/api/login`
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
      if (currentUser.token) {
        console.log(currentUser, "currentUser");
        // console.log(currentUser.token, "currentUser.token");
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        setUser(currentUser);
        console.log("set user after login");
        // history.push("/");
        history.push(`/chat/${currentUser.user.userSlug}`);
        // window.location.reload();
        // return;
      } else {
        console.log(currentUser);
        setError(currentUser.message);
        error.current.classNameList.add("display");
        setTimeout(() => {
          error.current.classNameList.remove("display");
        }, 2000);
      }
    } catch (e) {
      console.log(e);
    }
  };

  let error = useRef(); // grab html element

  return (
    <div className="container vh-100">
      {/* <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => settUsername(e.target.value)}
            placeholder="Enter Username"
            required
          />
        </div>
        <div className="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div ref={error} className="error-container d-block pb-4">
          <h3 className="m-0">{errMessage}</h3>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form> */}
      <div className="col-12 col-md-6 mx-auto">
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
