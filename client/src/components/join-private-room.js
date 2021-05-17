import React, { useState, useRef, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { authHeader } from "../services/auth";
// import { UserContext } from "../UserContext";
import axios from "axios";

function JoinPrivateRoom(props) {
  const [room, setRoom] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  let history = useHistory();
  // const ENDPOINT = "http://localhost:5000";
  const ENDPOINT = "https://mern-caht-app.herokuapp.com";

  const JoinRoom = async (e) => {
    if (room !== "" && password !== "") {
      try {
        const res = await axios.post(
          `${ENDPOINT}/api/room-pass`,

          { data: { room, password } }
        );
        if (res.data.message) {
          setErrMessage(res.data.message);
          error.current.classList.add("display");
          setTimeout(() => {
            error.current.classList.remove("display");
          }, 2000);
        } else if (res.reponse) {
          console.log("status is other than 200 range");
          console.log(res.reponse, "res.reponse");
        } else {
          history.push({
            pathname: `${props.location.state.baseURL}/${res.data[0].roomSlug}`,
            state: {
              roomInfo: {
                roomName: res.data[0].roomName,
                roomID: res.data[0]._id,
              },
            },
          });
          setRoom("");
        }
        e.preventDefault();
      } catch (err) {
        if (err.response) {
          // room not found message
          setErrMessage(err.response.data.message);
        } else {
          setErrMessage("Something went wrong");
        }
        error.current.classList.add("display");
        setTimeout(() => {
          error.current.classList.remove("display");
        }, 2000);
      }
    } else {
      if (room === "" && password === "") {
        setErrMessage("Enter Password and Room");
      } else if (room === "") {
        setErrMessage("Enter Room");
      } else {
        setErrMessage("Enter Password");
      }
      error.current.classList.add("display");
      setTimeout(() => {
        error.current.classList.remove("display");
      }, 2000);
    }
  };

  let error = useRef(); // grab html element

  return (
    <div className="container mid-break-margin h-90vh">
      <div className="col-md-8 col-lg-6 mx-auto">
        <div className="box create-room">
          <label for="room" className="text-white">
            Enter the private room's name!
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setRoom(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <div ref={error} className="error-container d-block pb-5">
            <h4 className="m-0 pb-2">{errMessage}</h4>
          </div>
          <button onClick={JoinRoom} className="big-button button-center">
            Join
          </button>
        </div>
      </div>
    </div>
  );
}

export default JoinPrivateRoom;
