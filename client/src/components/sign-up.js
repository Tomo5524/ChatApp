import React, { useState, useRef, useContext } from "react";
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
  const ENDPOINT = "https://mern-caht-app.herokuapp.com";
  // const ENDPOINT = "http://localhost:5000";
  // let errorMessage;

  const checkPassword = (password, confirmpass) => {
    if (password === confirmpass) return true;
    else return false;
  };

  const handleSubmit = (e) => {
    if (checkPassword(password, confirmpass)) {
      fetch(`${ENDPOINT}/api/sign-up`, {
        // mode: "cors",
        method: "POST",
        acition: `${ENDPOINT}/api/sign-up`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
        .then((data) => data.json())
        .then((res) => {
          // if sign up successfully went through
          if (res.token) {
            // set user globally wiht useContext
            setUser(res);
            localStorage.setItem("currentUser", JSON.stringify(res));
            history.push(`/chat/${res.user.userSlug}`);
          }
          // error example: can connect database but something went wrong, etc, username already is taken
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
    <div className="container mid-break-margin h-90vh">
      <div className="col-md-8 col-lg-6 mx-auto">
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
