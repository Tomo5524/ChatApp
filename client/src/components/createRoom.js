import React, { useState, useRef, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { authHeader } from "../services/auth";
// import { UserContext } from "../UserContext";

function AddRoom(props) {
  const [room, setRoom] = useState("");
  const [roomPrivate, setRoomPrivate] = useState(false);
  const [password, setPassword] = useState("");

  let history = useHistory();
  // const ENDPOINT = "http://localhost:5000";
  const ENDPOINT = "https://mern-caht-app.herokuapp.com";

  const createRoom = async (e) => {
    try {
      const data = await fetch(`${ENDPOINT}/api/create-room`, {
        mode: "cors",
        method: "POST",
        // acition: ``${ENDPOINT}/api/create-room``,
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader(),
        },
        body: JSON.stringify({
          roomname: room,
          userID: props.location.state.userID,
          private: roomPrivate,
          password,
        }),
      });
      const newRoom = await data.json();
      e.preventDefault();
      setRoom("");
      history.push({
        pathname: `${props.location.state.baseURL}/${newRoom.roomSlug}`,
        state: { roomInfo: { roomName: newRoom.roomName, roomID: newRoom.id } },
      });
      // history.push(`${currnetURL}/${room.roomSlug}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePrivateChange = () => {
    setRoomPrivate(!roomPrivate);
    // if private is selected, make passowrd input pop-up
    if (roomPrivate) {
      passwordInput.current.classList.remove("display");
      passwordInput.current.classList.add("no-display");
    } else {
      passwordInput.current.classList.remove("no-display");
      passwordInput.current.classList.add("display");
    }
  };

  let passwordInput = useRef(); // grab html element

  return (
    <div className="container mid-break-margin h-90vh">
      <div className="col-md-8 col-lg-6 mx-auto">
        <div className="box create-room">
          <label for="room" className="text-white">
            Type room name!
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setRoom(e.target.value)}
            required
          />
          <div ref={passwordInput} className="no-display">
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            {/* <h3 className="m-0">{errMessage}</h3> */}
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
              onChange={handlePrivateChange}
            />
            <label
              className="form-check-label text-white mb-3"
              for="flexCheckDefault"
            >
              Make it private
            </label>
          </div>
          <button onClick={createRoom} className="big-button button-center">
            Add room
          </button>
          {/* <button className="big-button">Add room</button> */}
        </div>
      </div>
    </div>
  );
}

export default AddRoom;
