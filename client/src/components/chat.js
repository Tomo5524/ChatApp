import React, { useState, useRef, useEffect } from "react";
// import renderHTML from "react-render-html";
import { authHeader, logOut, getUser } from "../services/auth";
import "../chatUI.css";
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
  const [message, setMessage] = useState("");
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
    // if (currentUser) {

    // }
    console.log("socket usereffect got called");
    socket = io(ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
    });
    // socket.emit("join", currentUser.user.username);
    // console.log(socket, "socket");
    if (currentUser) {
      socket.emit("join", { username, roomName });

      // unamount
      // return () => {
      //   socket.emit("disconnect");
      //   // turn off the user that just left
      //   socket.off();
      // };
    }
  }, [currentUser]);

  useEffect(() => {
    socket.on("message", (msg) => {
      // setMessages([...messages, message]);
      console.log(msg, "msg");
    });
  }, [messages]);

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
    <div className="page-content page-container" id="page-content">
      <h1>Hiya</h1>
      <div className="padding">
        <div className="row container d-flex justify-content-center">
          <div className="col-md-6">
            <div className="card card-bordered">
              <div className="card-header">
                <h4 className="card-title">
                  <strong>Chat</strong>
                </h4>{" "}
                <a className="btn btn-xs btn-secondary" dataAbc="true">
                  Choose Another Room
                </a>
              </div>
              <div
                className="ps-container ps-theme-default ps-active-y"
                id="chat-content"
                style={{
                  overflowY: "scroll !important",
                  height: "400px !important",
                }}
              >
                <div className="media media-chat">
                  {" "}
                  <img
                    className="avatar"
                    src="https://img.icons8.com/color/36/000000/administrator-male.png"
                    alt="..."
                  />
                  <div className="media-body">
                    <p>Hi</p>
                    <p>How are you ...???</p>

                    <p className="meta">
                      <time datetime="2018">23:58</time>
                    </p>
                  </div>
                </div>
                <div className="media media-meta-day">Today</div>
                <div className="media media-chat media-chat-reverse">
                  <div className="media-body">
                    <p>Hiii, I'm good.</p>
                    <p>How are you doing?</p>
                    <p>
                      Long time no see! Tomorrow office. will be free on sunday.
                    </p>
                    <p className="meta">
                      {/* <time datetime="2018">00:06</time> */}
                    </p>
                  </div>
                </div>
                <div className="media media-chat">
                  {" "}
                  {/* <img
                    className="avatar"
                    src="https://img.icons8.com/color/36/000000/administrator-male.png"
                    alt="..."
                  /> */}
                  <div className="media-body">
                    <p>Okay</p>
                    <p>We will go on sunday? </p>
                    <p className="meta">
                      <time datetime="2018">00:07</time>
                    </p>
                  </div>
                </div>
                <div className="media media-chat media-chat-reverse">
                  <div className="media-body">
                    <p>That's awesome!</p>
                    <p>I will meet you Sandon Square sharp at 10 AM</p>
                    <p>Is that okay?</p>
                    <p className="meta">
                      {/* <time datetime="2018">00:09</time> */}
                    </p>
                  </div>
                </div>
                <div className="media media-chat">
                  {" "}
                  <img
                    className="avatar"
                    src="https://img.icons8.com/color/36/000000/administrator-male.png"
                    alt="..."
                  />
                  <div className="media-body">
                    <p>Okay i will meet you on Sandon Square </p>
                    <p className="meta">
                      <time datetime="2018">00:10</time>
                    </p>
                  </div>
                </div>
                <div className="media media-chat media-chat-reverse">
                  <div className="media-body">
                    <p>Do you have pictures of Matley Marriage?</p>
                    <p className="meta">
                      <time datetime="2018">00:10</time>
                    </p>
                  </div>
                </div>
                <div className="media media-chat">
                  {" "}
                  <img
                    className="avatar"
                    src="https://img.icons8.com/color/36/000000/administrator-male.png"
                    alt="..."
                  />
                  <div className="media-body">
                    <p>Sorry I don't have. i changed my phone.</p>
                    <p className="meta">
                      <time datetime="2018">00:12</time>
                    </p>
                  </div>
                </div>
                <div className="media media-chat media-chat-reverse">
                  <div className="media-body">
                    <p>Okay then see you on sunday!!</p>
                    <p className="meta">
                      <time datetime="2018">00:12</time>
                    </p>
                  </div>
                </div>
                <div
                  className="ps-scrollbar-x-rail"
                  style={{ left: "0px", bottom: "0px" }}
                >
                  <div
                    className="ps-scrollbar-x"
                    tabindex="0"
                    style={{ left: "0px", width: "0px" }}
                  ></div>
                </div>
                <div
                  className="ps-scrollbar-y-rail"
                  style={{ top: "0px", height: "0px", right: "2px" }}
                >
                  <div
                    className="ps-scrollbar-y"
                    tabindex="0"
                    style={{ top: "0px", height: "2px" }}
                  ></div>
                </div>
              </div>
              <div className="publisher bt-1 border-light">
                {" "}
                <img
                  className="avatar avatar-xs"
                  src="https://img.icons8.com/color/36/000000/administrator-male.png"
                  alt="..."
                />{" "}
                <input
                  className="publisher-input"
                  type="text"
                  placeholder="Write something"
                />{" "}
                <span className="publisher-btn file-group">
                  {" "}
                  <i className="fa fa-paperclip file-browser"></i>{" "}
                  <input type="file" />{" "}
                </span>{" "}
                <a className="publisher-btn" data-abc="true">
                  <i className="fa fa-smile"></i>
                </a>{" "}
                <a className="publisher-btn text-info" data-abc="true">
                  <i className="fa fa-paper-plane"></i>
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
