import React, { useState, useRef, useEffect } from "react";
// import renderHTML from "react-render-html";
import { authHeader, logOut, getUser } from "../services/auth";
import RoomID from "./utils/roomID";
import "./style/room.css";
import { useHistory } from "react-router-dom";
// import io from "socket.io-client";

// let socket;

function Room() {
  // console.log(localStorage, "locastorage");
  // const [username, settUsername] = useState("");
  console.log("room got called");
  const [currentUser, setCurrentUser] = useState("");
  const [Room, setRoom] = useState("");
  // without this, add room component always gets displayed right after the page is loaded. this state prevents that from happening.
  const [roomsLoaded, setRoomsLoaded] = useState(false);
  // console.log("🚀 ~ file: room.js ~ line 16 ~ Room ~ Room", Room);
  const [roomID, setRoomID] = useState("");
  const [rooms, setRooms] = useState([]);
  // pass in roominfo to chat componnet so room messages can be extracted from its id
  const { username, id } = currentUser && currentUser.user;
  // console.log(currentUser.user);
  // const username = currentUser && currentUser.user.username;
  // const id = currentUser && currentUser.user.id;
  // console.log(id, "id");

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
      const res = await fetch(`${ENDPOINT}/api/rooms`, {
        mode: "cors",
      });
      console.log(res, "res////////");
      const data = await res.json();
      console.log(data, "data/////");
      setRooms(data);
      setRoomsLoaded(true);
    } catch (e) {
      console.log(e);
    }
  };

  // const isFirstRun = useRef(true);

  // useEffect(() => {
  //   // if (isFirstRun.current) {
  //   //   isFirstRun.current = false;
  //   //   return;
  //   // }
  //   console.log("socket usereffect got called");
  //   socket = io(ENDPOINT, {
  //     transports: ["websocket", "polling", "flashsocket"],
  //   });
  //   // socket.emit("join", currentUser.user.username);
  //   // console.log(socket, "socket");
  //   if (currentUser) {
  //     socket.emit("join", username);
  //     // unamount
  //     // return () => {
  //     //   socket.emit("disconnect");
  //     //   // turn off the user that just left
  //     //   socket.off();
  //     // };
  //   }
  // }, [currentUser]);

  const handleLogOut = () => {
    setCurrentUser("");
    logOut();
    // isFirstRun.current = true;
  };

  const deleteUser = (e) => {
    if (currentUser) {
      try {
        fetch(`${ENDPOINT}/api/delete/${id}`, {
          mode: "cors",
          method: "POST",
          // acition: `http://localhost:5000/api/delete/${id}`,
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

  // if there is no room to select, let user create a new room and navigate to chat component
  const createRoom = async (e) => {
    console.log("create room");
    console.log(Room, "Room");
    try {
      const data = await fetch(`${ENDPOINT}/api/create-room`, {
        mode: "cors",
        method: "POST",
        // acition: ``${ENDPOINT}/api/create-room``,
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader(),
        },
        body: JSON.stringify({ roomname: Room }),
      });
      console.log("🚀 ~ file: chat.js ~ line 118 ~ createRoom ~ room", data);
      const room = await data.json();
      console.log(room, "room/////");
      e.preventDefault();
      setRoom("");
      // console.log(history, "history");
      const currnetURL = history.location.pathname;
      history.push({
        pathname: `${currnetURL}/${room.roomSlug}`,
        state: { roomInfo: { roomName: room.roomName, roomID: room.id } },
      });
      // history.push(`${currnetURL}/${room.roomSlug}`);
    } catch (err) {
      console.error(err);
    }
  };

  // if there are already rooms to choose, this functin gets called
  const moveToAnotherRoom = () => {
    // if there is no room that is choosen by user, don't proceed
    if (Room) {
      console.log(
        Room,
        "Room before moving onto another component////////////"
      );
      console.log(roomID, "roomID moving onto another component////////////");
      const currnetURL = history.location.pathname;
      // at this point, Room is roomSlug
      history.push({
        pathname: `${currnetURL}/${Room}`,
        state: { roomInfo: { roomName: Room, roomID } },
      });
    }
  };

  // console.log(Room, "Room");

  return (
    <div className="container vh-100">
      <h2>Welcome to Chat App</h2>
      {currentUser ? <h4>Welcomeback {username}!</h4> : <h2>No User</h2>}
      {/* <a className="btn btn-primary" onClick={handleLogOut}>
        Log out
      </a>
      <form>
        <a className="btn btn-danger" onClick={deleteUser}>
          User Delete
        </a>
      </form> */}
      {/* if room exists, let user choose it, if not, let user create new one. */}
      <div class="row">
        <div class="col-md-6">
          <div class="box">
            <h1>
              {currentUser ? (
                <h4>Welcomeback {username}!</h4>
              ) : (
                <h2>No User</h2>
              )}
            </h1>
            <p class="text-muted"> Please choose room!</p>
            {
              roomsLoaded ? (
                rooms && rooms.length !== 0 ? (
                  <div className="d-block text-center">
                    <label for="room">Room: </label>
                    <select
                      name="room"
                      value={Room}
                      onChange={(e) => {
                        setRoomID(RoomID(e));
                        setRoom(e.target.value);
                      }}
                    >
                      <option value="" selected disabled hidden>
                        Choose Room
                      </option>
                      {rooms.map((room) => (
                        <option
                          key={room._id}
                          id={room._id}
                          value={room.roomSlug}
                        >
                          {room.roomName}
                        </option>
                      ))}
                    </select>
                    <button onClick={moveToAnotherRoom} className="big-button">
                      Go to room
                    </button>
                    {/* <div className="col-6 mt-4">
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
                    </div> */}
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
                )
              ) : null
              // (
              //   <div>
              //     {/* somehting is wrong with db */}
              //     <h2>Something went wrong 😭</h2>
              //   </div>
              // )
            }
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Room;
