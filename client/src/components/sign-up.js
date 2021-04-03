import React, { useState, useRef } from "react";
// import renderHTML from "react-render-html";
// import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Signup() {
  const [username, settUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [err, setError] = useState("");
  let history = useHistory();

  console.log(username, "username,/////////");
  console.log(password, "password,,/////////");

  const usernameChange = (e) => {
    settUsername(e.target.value);
  };

  // console.log("hiya");

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const confirmpassChange = (e) => {
    setConfirmpass(e.target.value);
  };

  const checkPassword = (password, confirmpass) => {
    if (password === confirmpass) return true;
    else return false;
  };

  const handleSubmit = (e) => {
    console.log("handleSubmit/////////");
    if (checkPassword(password, confirmpass)) {
      console.log(password, confirmpass, "password, confirmpass/////////");
      // console.log("password, went thru/////////");
      fetch("http://localhost:5000/api/sign-up", {
        // mode: "cors",
        method: "POST",
        acition: "http://localhost:5000/api/sign-up",
        headers: {
          "Content-Type": "application/json",
          // Connection: "keep-alive",
          // credentials: "include",
        },
        body: JSON.stringify({ username, password }),
      })
        .then(function (response) {
          // console.log("went through/////////");
          console.log(response, "response//////");
          return response.json();
        })

        .catch((err) => {
          console.log("did not go thru");
          console.log(err);
        });
      // history.push("/");
    } else {
      error.current.classList.add("display");
      setTimeout(() => {
        error.current.classList.remove("display");
      }, 4000);
    }
    e.preventDefault();
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
        <div className="form-group">
          <label for="confirmPassword">Confirm Pasword</label>
          <input
            type="password"
            className="form-control"
            onChange={confirmpassChange}
            placeholder="Enter the same Password ablove to confirm"
            required
          />
        </div>
        <div ref={error} className="error-container d-block pb-3">
          <p className="m-0">Password don't match</p>
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
