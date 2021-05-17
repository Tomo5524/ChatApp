import React, { useState, useRef, useEffect, useContext } from "react";
import { authHeader, logOut, getUser } from "../services/auth";
import RoomID from "./utils/roomID";
import "./style/room.css";
import { useHistory, Link } from "react-router-dom";
import CreateRoom from "./createRoom";
import { UserContext } from "../UserContext";
import { LoadRoomsContext } from "../LoadRoomsContext";
import Loader from "./loader";
import axios from "axios";

function Room() {
  // global user context
  const { user, setUser } = useContext(UserContext);
  // if server (Heroku) is activated, reduce the timeset out and this is the flag
  const { roomsLoadCalled, setroomsLoadCalled } = useContext(LoadRoomsContext);
  const [roomsLoaded, setRoomsLoaded] = useState(false);
  const [Room, setRoom] = useState("");
  const [roomID, setRoomID] = useState("");
  const [rooms, setRooms] = useState([]);

  const username = user && user.user.username;
  const id = user && user.user._id;

  let history = useHistory();
  // const ENDPOINT = "http://localhost:5000";
  const ENDPOINT = "https://mern-caht-app.herokuapp.com";

  useEffect(() => {
    // grab rooms from back end
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get(`${ENDPOINT}/api/rooms`, {
        mode: "cors",
      });
      setRooms(res.data);
      // when loading is way too fast, loader icon disappears right away so let it stay for a few seconds
      if (roomsLoadCalled) {
        // API already got called so Heroku (backend server) is awake and runs faster than the very first fetch
        setTimeout(() => {
          setRoomsLoaded(true);
        }, 500);
      } else {
        // first time to fetch API so have a longer timeout
        setTimeout(() => {
          setRoomsLoaded(true);
          setroomsLoadCalled(true);
        }, 1250);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogOut = () => {
    setUser(null);
    logOut();
    history.push("/sign-up");
  };

  const deleteUser = (e) => {
    e.preventDefault();
    if (user) {
      try {
        fetch(`${ENDPOINT}/api/delete/${id}`, {
          mode: "cors",
          method: "POST",
          // acition: `${ENDPOINT}/api/delete/${id}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader(),
          },
        });
        handleLogOut();
        history.push("/sign-up");
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // if there are already rooms to choose, this functin gets called
  const moveToAnotherRoom = () => {
    // if there is no room that is choosen by user, don't proceed
    if (Room) {
      const currnetURL = history.location.pathname;
      // at this point, Room is roomSlug
      history.push({
        pathname: `${currnetURL}/${Room}`,
        state: { roomInfo: { roomName: Room, roomID } },
      });
    }
  };
  return (
    <div className="container mid-break-margin h-90vh">
      <div class="col-md-8 col-lg-6 mx-auto">
        {roomsLoaded ? (
          <div class="box">
            <div className="p-4">
              <h1>
                {user ? <h4>Welcomeback {username}!</h4> : <h2>No User</h2>}
              </h1>
              <p class="text-muted p-3">Choose public room!</p>
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
                      Join room
                    </button>
                  </div>
                  <div className="m-auto">
                    <Link
                      to={{
                        pathname: "/create-room",
                        // state: { setRoom, createRoom },
                        state: {
                          baseURL: history.location.pathname,
                          userID: id,
                        },
                      }}
                      className="link-padding d-block"
                    >
                      <a className="text-white">Create a new room</a>
                    </Link>
                    <Link
                      to={{
                        pathname: "/join-private-room",
                        state: {
                          baseURL: history.location.pathname,
                          userID: id,
                        },
                      }}
                      className="link-padding d-block"
                    >
                      <a className="text-white">Join private room</a>
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
                        state: {
                          baseURL: history.location.pathname,
                          userID: id,
                        },
                      }}
                      className="link-padding"
                    >
                      <a className="text-white text-link">Create a new room</a>
                    </Link>
                    <Link
                      to={{
                        pathname: "/join-private-room",
                        state: {
                          baseURL: history.location.pathname,
                          userID: id,
                        },
                      }}
                      className="link-padding"
                    >
                      <a className="text-white text-link">Join private room</a>
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
          <Loader />
        )}
      </div>
    </div>
  );
}

export default Room;
