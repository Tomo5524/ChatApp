import React, { useState, useRef, useEffect } from "react";
// import renderHTML from "react-render-html";
import { authHeader, logOut, getUser } from "../services/auth";

import { useHistory } from "react-router-dom";
import io from "socket.io-client";

let socket;

function Chat() {
  console.log(localStorage, "locastorage");
  // const [username, settUsername] = useState("");
  console.log("chat got called");
  const [currentUser, setCurrentUser] = useState("");
  const [Room, setRoom] = useState("");
  const [Rooms, setRooms] = [];
  console.log("🚀 ~ file: chat.js ~ line 15 ~ Chat ~ currentUser", currentUser);
  const username = currentUser && currentUser.user.username;
  const id = currentUser && currentUser.user.id;
  console.log(id, "id");

  let history = useHistory();
  const ENDPOINT = "http://localhost:5000";

  useEffect(() => {
    console.log("first user effect got called");
    // get current user
    setCurrentUser(getUser());
    // grab rooms from back end
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/rooms", {
        mode: "cors",
      });
      // const res = await fetch(`${baseURL}/api/posts`);
      // research error net::ERR_CONNECTION_REFUSED
      console.log(res, "res////////");
      const data = await res.json();
      console.log(data, "data/////");
      setRooms(data);
    } catch (e) {
      console.log(e);
    }
  };

  // const isFirstRun = useRef(true);

  useEffect(() => {
    // if (isFirstRun.current) {
    //   isFirstRun.current = false;
    //   return;
    // }
    console.log("socket usereffect got called");
    socket = io(ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
    });
    // socket.emit("join", currentUser.user.username);
    // console.log(socket, "socket");
    if (currentUser) {
      socket.emit("join", username);
      // unamount
      return () => {
        socket.emit("disconnect");
        // turn off the user that just left
        socket.off();
      };
    }
  }, [currentUser]);

  const handleLogOut = () => {
    // setCurrentUser("");
    logOut();
    // isFirstRun.current = true;
  };

  const deleteUser = (e) => {
    ///there is a delay after you delay react delete
    // console.log(props.location.state.post._id, "props._id//////////");
    if (currentUser) {
      try {
        fetch(`http://localhost:5000/api/delete/${id}`, {
          mode: "cors",
          method: "POST",
          acition: `http://localhost:5000/api/delete/${id}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader(),
          },
        });
        e.preventDefault();
        handleLogOut();
        history.push("/");
        console.log("delete called");
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const createRoom = (e) => {
    console.log("create room");
    console.log(Room, "Room");

    try {
      fetch(`http://localhost:5000/api/room`, {
        mode: "cors",
        method: "POST",
        acition: `http://localhost:5000/api/room`,
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader(),
        },
      });
      e.preventDefault();
      handleLogOut();
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Welcome to Chat App</h2>
      {currentUser ? <h4>Welcomeback {username}!</h4> : <h2>No User</h2>}
      <button className="btn btn-primary" onClick={handleLogOut}>
        Log out
      </button>
      <form>
        <button className="btn btn-danger" onClick={deleteUser}>
          User Delete
        </button>
      </form>
      {/* if room exists, let user choose it, if not, let user create new one. */}
      <div>
        {Rooms ? (
          <div className="form-group">
            <label for="room">Room: </label>
            <select
              name="room"
              value={Room}
              className="form-control"
              onChange={(e) => setRoom(e.target.value)}
            >
              <option value="meow">meow</option>
              <option value="birk">dog</option>
              <option value="fox">yeah</option>
              {/* {rooms.map((room) => (
            <option key={room} value={room}>
              {room}
            </option>
          ))} */}
            </select>
          </div>
        ) : (
          <div className="col-6">
            <label for="room">Room</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setRoom(e.target.value)}
              required
            />
            <button onClick={createRoom} className="big-button">
              Add room
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
