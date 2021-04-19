import React, { useState, useRef, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { authHeader } from "../services/auth";

function AddRoom(props) {
  // console.log(props);
  // const { setRoom, createRoom } = props.location;
  // console.log(setRoom, createRoom, "setRoom, createRoom");
  // console.log(props.location.state.baseURL);
  // const { baseURL } = props.location.state; this returns undefined for some reason
  // console.log(baseURL); return undefined
  const [room, setRoom] = useState("");

  let history = useHistory();
  const ENDPOINT = "http://localhost:5000";

  const createRoom = async (e) => {
    console.log("create room");
    console.log(room, "Room");
    try {
      const data = await fetch(`${ENDPOINT}/api/create-room`, {
        mode: "cors",
        method: "POST",
        // acition: ``${ENDPOINT}/api/create-room``,
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader(),
        },
        body: JSON.stringify({ roomname: room }),
      });
      console.log("🚀 ~ file: chat.js ~ line 118 ~ createRoom ~ room", data);
      const newRoom = await data.json();
      console.log(newRoom, "room/////");
      e.preventDefault();
      setRoom("");
      // console.log(history, "history");
      // const currnetURL = history.location.pathname;
      history.push({
        pathname: `${props.location.state.baseURL}/${newRoom.roomSlug}`,
        state: { roomInfo: { roomName: newRoom.roomName, roomID: newRoom.id } },
      });
      // history.push(`${currnetURL}/${room.roomSlug}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container vh-100">
      <div class="row">
        <div class="col-md-6">
          <div class="box create-room">
            <label for="room" className="text-white">
              Type room name!
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setRoom(e.target.value)}
              required
            />
            <button onClick={createRoom} className="big-button button-center">
              Add room
            </button>
            {/* <button className="big-button">Add room</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRoom;