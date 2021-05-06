import React, { useState, useRef, useEffect, useContext } from "react";
// import renderHTML from "react-render-html";
import { authHeader, logOut, getUser } from "../services/auth";
import RoomID from "./utils/roomID";
import "./style/room.css";
import { useHistory, Link } from "react-router-dom";
import CreateRoom from "./createRoom";
// import io from "socket.io-client";
import { UserContext } from "../UserContext";
import Loader from "./loader";
import Progress from "./progress";
import axios from "axios";

// let socket;

function Room() {
  const { user, setUser } = useContext(UserContext);
  console.log("🚀 ~ file: room.js ~ line 15 ~ Room ~ user", user);
  // console.log(localStorage, "locastorage");
  // const [username, settUsername] = useState("");
  console.log("room got called");
  // const [loading, setLoading] = useState(false);
  // const [currentUser, setCurrentUser] = useState("");
  const [Room, setRoom] = useState("");
  // without this, add room component always gets displayed right after the page is loaded. this state prevents that from happening.
  const [roomsLoaded, setRoomsLoaded] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  console.log(
    "🚀 ~ file: room.js ~ line 28 ~ Room ~ uploadPercentage",
    uploadPercentage
  );
  const [message, setMessage] = useState("");
  // console.log("🚀 ~ file: room.js ~ line 16 ~ Room ~ Room", Room);
  const [roomID, setRoomID] = useState("");
  const [rooms, setRooms] = useState([]);
  console.log("🚀 ~ file: room.js ~ line 26 ~ Room ~ rooms", rooms);
  // pass in roominfo to chat componnet so room messages can be extracted from its id
  // const { username, id } = user && user.user;
  // console.log(currentUser.user);
  const username = user && user.user.username;
  const id = user && user.user._id;
  // console.log(id, "id");

  let history = useHistory();
  // const ENDPOINT = "http://localhost:5000";
  const ENDPOINT = "https://mern-caht-app.herokuapp.com";

  useEffect(() => {
    console.log("first user effect got called");
    // setRoomsLoaded(true);
    // get current user
    // setCurrentUser(getUser());
    // grab rooms from back end
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      // setLoading(true);
      // const res = await fetch(`${ENDPOINT}/api/rooms`, {
      //   mode: "cors",
      // });
      const res = await axios.get(`${ENDPOINT}/api/rooms`, {
        onDownloadProgress: (progressEvent) => {
          console.log(
            "🚀 ~ file: room.js ~ line 70 ~ fetchRooms ~ progressEvent",
            progressEvent
          );
          console.log("progress event got called////////////");
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        },
      });
      // console.log(res, "res////////");
      // const data = await res.json();

      // Clear percentage
      // setTimeout(() => setUploadPercentage(0), 10000);
      console.log(res, "data/////");
      setRooms(res.data);
      setRoomsLoaded(true);
      // setLoading(false);
    } catch (err) {
      console.log(err);
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
      setUploadPercentage(0);
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
    setUser(null);
    logOut();
    console.log("logout called");
    history.push("/sign-up");
    // isFirstRun.current = true;
  };

  const deleteUser = (e) => {
    if (user) {
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
  // const createRoom = async (e) => {
  //   console.log("create room");
  //   console.log(Room, "Room");
  //   if (Room) {
  //     try {
  //       const data = await fetch(`${ENDPOINT}/api/create-room`, {
  //         mode: "cors",
  //         method: "POST",
  //         // acition: ``${ENDPOINT}/api/create-room``,
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: authHeader(),
  //         },
  //         body: JSON.stringify({ roomname: Room }),
  //       });
  //       console.log("🚀 ~ file: chat.js ~ line 118 ~ createRoom ~ room", data);
  //       const room = await data.json();
  //       console.log(room, "room/////");
  //       e.preventDefault();
  //       setRoom("");
  //       // console.log(history, "history");
  //       const currnetURL = history.location.pathname;
  //       history.push({
  //         pathname: `${currnetURL}/${room.roomSlug}`,
  //         state: { roomInfo: { roomName: room.roomName, roomID: room.id } },
  //       });
  //       // history.push(`${currnetURL}/${room.roomSlug}`);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   } else {
  //     console.log("room name is not valid");
  //   }
  // };

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
    <div className="container mid-break-margin h-90vh">
      {/* <a className="btn btn-primary" onClick={handleLogOut}>
        Log out
      </a>
      <form>
        <a className="btn btn-danger" onClick={deleteUser}>
          User Delete
        </a>
      </form> */}
      {/* if room exists, let user choose it, if not, let user create new one. */}
      {/* <div className="col-12 col-md-10 d-none d-xl-block"> */}
      <div class="col-md-8 col-lg-6 mx-auto">
        {roomsLoaded ? (
          <div class="box">
            {/* {message ? <Message msg={message} /> : null} */}
            <div className="p-4">
              <h1>
                {user ? <h4>Welcomeback {username}!</h4> : <h2>No User</h2>}
              </h1>
              <p class="text-muted p-3"> Please choose room!</p>
              {rooms && rooms.length !== 0 ? (
                <>
                  <div className="form-box">
                    <select
                      name="room"
                      value={Room}
                      className="p-1 mb-4"
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
                    <button
                      onClick={moveToAnotherRoom}
                      className="big-button mb-5"
                    >
                      Go to room
                    </button>
                    <Link
                      to={{
                        pathname: "/create-room",
                        // state: { setRoom, createRoom },
                        state: { baseURL: history.location.pathname },
                      }}
                    >
                      <button class="btn text-white">Create a new room</button>
                    </Link>
                  </div>
                  <div className="d-flex justify-content-center pt-3">
                    <button className="btn btn-primary" onClick={handleLogOut}>
                      Log out
                    </button>
                    <form>
                      <a className="btn btn-danger ml-2" onClick={deleteUser}>
                        User Delete
                      </a>
                    </form>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="text-white">
                      No rooms to chat in. <br /> Create a new one!
                    </h3>
                    <Link
                      to={{
                        pathname: "/create-room",
                        state: { baseURL: history.location.pathname },
                      }}
                    >
                      <button class="btn text-white">Create a new room</button>
                    </Link>
                  </div>
                  <div className="d-flex justify-content-center pt-3">
                    <button className="btn btn-primary" onClick={handleLogOut}>
                      Log out
                    </button>
                    <form>
                      <a className="btn btn-danger ml-2" onClick={deleteUser}>
                        User Delete
                      </a>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <>
            <Progress percentage={uploadPercentage} />
            <div>hiya</div>
          </>

          // <Loader />
        )}
      </div>
    </div>
  );
}

export default Room;
