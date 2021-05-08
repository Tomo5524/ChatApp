import React, { useState, useRef, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { authHeader } from "../services/auth";
// import { UserContext } from "../UserContext";
import axios from "axios";

function JoinPrivateRoom(props) {
  // console.log(props.location.state.baseURL);
  // const { baseURL } = props.location.state; this returns undefined for some reason
  // console.log(baseURL); return undefined
  const [room, setRoom] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  let history = useHistory();
  const ENDPOINT = "http://localhost:5000";
  // const ENDPOINT = "https://mern-caht-app.herokuapp.com";

  // const JoinRoom = () => {
  //   console.log("hiya");
  // };

  const JoinRoom = async (e) => {
    if (room !== "" && password !== "") {
      try {
        const res = await axios.post(
          `${ENDPOINT}/api/room-pass`,

          { data: { room, password } }
        );
        console.log(
          "🚀 ~ file: join-private-room.js ~ line 26 ~ JoinRoom ~ res",
          res
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
          console.log(res.data[0].roomSlug, "res.data[0].roomSlug////");
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
          console.log("user successfully joined a room");
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
        console.log("error got called");
        console.log(err, "err from server");
        console.error(err);
        console.log(err.response, "err.response");
      }
    } else {
      if (room === "" && password === "") {
        setErrMessage("Enter Password and Room");
      } else if (room !== "") {
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
          {/* <div className="input-group">
            <div className="form-outline">
              <input type="search" id="form1" className="form-control" />
              <label className="form-label" for="form1">
                Search
              </label>
            </div>
            <button type="button" className="btn btn-primary">
              <i className="fas fa-search"></i> 
              :)
            </button>
          </div> */}
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
          {/* <button className="big-button">Add room</button> */}
        </div>
      </div>
    </div>
  );
}

export default JoinPrivateRoom;
