import React, { useState, useRef } from "react";
// import renderHTML from "react-render-html";
// import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Login() {
  const [username, settUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setError] = useState("");
  let history = useHistory();

  const usernameChange = (e) => {
    settUsername(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit/////////");
    // const res = await fetch(`${baseURL}/api/login`
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        mode: "cors",
        method: "POST",
        acition: "https://leapintofuture.com/api/login",
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
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        history.push("/");
        window.location.reload();
        return;
      }
      console.log(currentUser);
      setError(currentUser.message);
      error.current.classList.add("display");
      setTimeout(() => {
        error.current.classList.remove("display");
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  };

  let error = useRef(); // grab html element

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            className="form-control"
            onChange={usernameChange}
            placeholder="Enter Username"
            required
          />
        </div>
        <div className="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={passwordChange}
            required
          />
        </div>
        <div ref={error} className="error-container d-block pb-4">
          <h3 className="m-0">{errMessage}</h3>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
