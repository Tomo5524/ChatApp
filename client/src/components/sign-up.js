import React, { useState, useRef, useContext } from "react";
// import renderHTML from "react-render-html";
// import { Link } from "react-router-dom";
import { useHistory, Link } from "react-router-dom";
import "./style/sign-up.css";
import { UserContext } from "../UserContext";

function Signup() {
  const { user, setUser } = useContext(UserContext);
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
            setUser(res);
            console.log(res.user.username, "res.user.username");
            localStorage.setItem("currentUser", JSON.stringify(res));
            history.push(`/chat/${res.user.userSlug}`);
            // history.push(`/chat/${res.user.username}`); wrong
            console.log(res, "currentUser");
            // return
          }
          // can connect database but something went wrong, etc, username already is taken
          else {
            // res has msg property (error message) sent from server
            seterrMessage(res.msg);
            error.current.classNameList.add("display");
            setTimeout(() => {
              error.current.classNameList.remove("display");
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
          error.current.classNameList.add("display");
          setTimeout(() => {
            error.current.classNameList.remove("display");
          }, 4000);
          console.log(errMessage);
        });
    } else {
      console.log("pass no match");
      seterrMessage("Passwords don't match");
      error.current.classNameList.add("display");
      setTimeout(() => {
        error.current.classNameList.remove("display");
      }, 4000);
    }
    e.preventDefault();
  };

  let error = useRef(); // grab html element

  return (
    <div className="container vh-100">
      <div className="col-12 col-md-6 mx-auto">
        <form onSubmit={handleSubmit} className="box p-4">
          <h1>Sign Up</h1>
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
          <input
            type="password"
            name="password"
            onChange={(e) => setConfirmpass(e.target.value)}
            placeholder="Confirm password"
            required
          />
          {/* <a className="forgot text-muted" href="#">
              Forgot password?
            </a> */}
          <input type="submit" value="Sign Up" />
          <Link to="/login">
            <button className="btn text-white">Already have an account</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
