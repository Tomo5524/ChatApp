import React, { useState, useRef } from "react";
// import renderHTML from "react-render-html";
// import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Signup() {
  const [username, settUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [errMessage, seterrMessage] = useState("");
  let history = useHistory();
  // let errorMessage;

  console.log(username, "username,/////////");
  console.log(password, "password,,/////////");

  const checkPassword = (password, confirmpass) => {
    if (password === confirmpass) return true;
    else return false;
  };

  const handleSubmit = (e) => {
    console.log("handleSubmit/////////");
    if (checkPassword(password, confirmpass)) {
      console.log(password, confirmpass, "password, confirmpass/////////");
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
        .then((data) => data.json())
        .then(function (res) {
          console.log("🚀 ~ file: sign-up.js ~ line 39 ~ res", res);
          // if user successfully sign up
          if (res.token) {
            console.log(res.user.username, "res.user.username");
            history.push(`/chat/${res.user.userSlug}`);
            // history.push(`/chat/${res.user.username}`); wrong
            console.log(res, "currentUser");
            localStorage.setItem("currentUser", JSON.stringify(res));
            // return
          }
          // can connect database but something went wrong, etc, username already is taken
          else {
            seterrMessage(res.msg);
            error.current.classList.add("display");
            setTimeout(() => {
              error.current.classList.remove("display");
            }, 4000);
            console.log(errMessage);
          }
        })
        .catch((err) => {
          console.log("did not go thru");
          console.log(err);
          // console.log({ err });
          // console.log(err.message);
          // seterrMessage(err); got the following error message,
          // Error: Objects are not valid as a React child (found: TypeError: Failed to fetch). If you meant to render a collection of children, use an array instead.
          // err is not string but object so you need to deconstruct
          // seterrMessage(err.message);
          // seterrMessage("Failed to connect database");
          seterrMessage("Something went wrong");
          error.current.classList.add("display");
          setTimeout(() => {
            error.current.classList.remove("display");
          }, 4000);
          console.log(errMessage);
        });
    } else {
      console.log("pass no match");
      seterrMessage("Passwords don't match");
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
        <div className="form-group">
          <label for="confirmPassword">Confirm Pasword</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setConfirmpass(e.target.value)}
            placeholder="Enter the same Password ablove to confirm"
            required
          />
        </div>
        <div ref={error} className="error-container d-block pb-3">
          <h2 className="m-0">{errMessage}</h2>
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
