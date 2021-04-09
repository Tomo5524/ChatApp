import React, { useState, useRef, useEffect } from "react";
// import renderHTML from "react-render-html";
import { authHeader, logOut, getUser } from "../services/auth";

import { useHistory } from "react-router-dom";
import io from "socket.io-client";

let socket;

function Chat(props) {
  // console.log("🚀 ~ file: chat.js ~ line 11 ~ Chat ~ props", props);
  const { roomName, roomID } = props.location.state.roomInfo;
  // console.log(
  //   "🚀 ~ file: chat.js ~ line 13 ~ Chat ~ room, roomID",
  //   roomName,
  //   roomID
  // );
  console.log("chat got called");
  const [currentUser, setCurrentUser] = useState("");
  const [messages, setMessages] = useState([]);
  let history = useHistory();
  const username = currentUser && currentUser.user.username;
  const id = currentUser && currentUser.user.id;
  const ENDPOINT = "http://localhost:5000";

  useEffect(() => {
    console.log("first user effect got called");
    setCurrentUser(getUser());
    // grab all messages in this room from back end
    // fetchMessages();
  }, []);

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
      socket.emit("join", username, roomName);
      // unamount
      // return () => {
      //   socket.emit("disconnect");
      //   // turn off the user that just left
      //   socket.off();
      // };
    }
  }, [currentUser]);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${ENDPOINT}/api/messages/${roomName}`, {
        mode: "cors",
      });
      console.log(res, "res////////");
      const messages = await res.json();
      console.log(
        "🚀 ~ file: chat.js ~ line 61 ~ fetchMessages ~ messages",
        messages
      );
      setMessages(messages);
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogOut = () => {
    setCurrentUser("");
    logOut();
    // isFirstRun.current = true;
  };

  return (
    <div>
      <h1>Hiya</h1>
    </div>
  );
}

export default Chat;
