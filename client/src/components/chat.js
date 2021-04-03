import React, { useState, useRef, useEffect } from "react";
// import renderHTML from "react-render-html";
// import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import io from "socket.io-client";

let socket;

function Chat() {
  // const [username, settUsername] = useState("");
  // let history = useHistory();
  const ENDPOINT = "http://localhost:5000";

  useEffect(() => {
    socket = io(ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
    });

    console.log(socket, "socket");

    // return () => {
    //   cleanup;
    // };
  }, []);

  return (
    <div className="container">
      <h1 className="display-1">Hiya</h1>
    </div>
  );
}

export default Chat;
