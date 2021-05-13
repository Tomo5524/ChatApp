import React, { useState, useRef, useEffect, useContext } from "react";
import { authHeader, logOut, getUser } from "../services/auth";
import "./style/chatUI.css";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import Message from "./message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperclip,
  faPaperPlane,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../UserContext";

let socket;

function Chat(props) {
  // props holds these values:
  // roomInfo:
  //     roomID: "example"
  //     roomName: "example-example"
  // roomName needed so in server, I can broadcast message to the all users in the room
  // roomID is crutial and will help grab the room by its ID in server
  const { roomName, roomID } =
    props.location.state !== undefined && props.location.state.roomInfo;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  let history = useHistory();

  const { user, setUser } = useContext(UserContext);
  const username = user && user.user.username;

  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };
  const messagesEndRef = useRef(null);

  // const ENDPOINT = "http://localhost:5000";
  const ENDPOINT = "https://mern-caht-app.herokuapp.com";

  useEffect(() => {
    // grab all messages in this room from back end
    fetchMessages();
  }, []);

  useEffect(() => {
    // instanciate socekt for each user
    socket = io(ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
    });
    // socket.emit("join", currentUser.user.username);

    socket.emit("join", { username, roomName });
    socket.on("welcomeMessage", (msg) => {
      // grab messages from API
      msg.username = username; // set currentusername as user
      // setMessages([...messages, msg]); // dose not have prevState
      setMessages((messages) => [...messages, msg]);
    });
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({
      // behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  // gets called everytime messages get updated
  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages([...messages, msg]);
    });
    scrollToBottom();
    setFocus();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const data = await fetch(`${ENDPOINT}/api/messages/${roomID}`, {
        mode: "cors",
      });

      const res = await data.json();
      setMessages((messages) => [...res.messages, ...messages]);
      // setMessages(res.messages);
    } catch (e) {
      console.log("something went wrong when fetching");
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    // make sure empty string is invalid
    if (message) {
      // send message to server
      socket.emit("messeageSent", { message, roomName });
      setMessage("");
      const outputMessage = { message, username, roomID };
      try {
        const data = await fetch(`${ENDPOINT}/api/send-message`, {
          mode: "cors",
          method: "POST",
          acition: `${ENDPOINT}/api/send-message`,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ outputMessage }),
        });
        // const newMessage = await data.json();
        // if (!newMessage) {
        //   console.log(
        //     "🚀 ~ file: chat.js ~ line 113 ~ sendMessage ~ newMessage",
        //     newMessage
        //   );
        //   console.log("message is successful!");
        //   // setFocus();
        //   // return;
        // } else {
        //   console.log("message failed");
        // }
      } catch (e) {
        console.log("something went wrong with the server. Try again later");
      }
    }
  };

  const deleteRoom = (e) => {
    console.log(roomID, "roomID/////");
    try {
      fetch(`${ENDPOINT}/api/delete-room/${roomID}`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader(),
        },
      });
      e.preventDefault();
      history.push("/");
      console.log("delete called");
      // window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page-content page-container pt-4 h-90vh" id="page-content">
      <div className="container h-90">
        <div className="row container d-flex justify-content-center h-100">
          <div className="col-md-8 col-lg-6 h-100">
            <div className="card card-bordered h-100">
              <div className="card-header">
                <h4 className="card-title">
                  <strong>Chat</strong>
                </h4>{" "}
                <a
                  className="btn btn-xs btn-secondary"
                  dataAbc="true"
                  onClick={deleteRoom}
                >
                  Delete This Room
                </a>
              </div>
              <div
                className="ps-container ps-theme-default ps-active-y overflow-auto h-100"
                id="chat-content"
              >
                {messages.map((msg, idx) => (
                  <Message key={idx} msg={msg} userName={username} />
                ))}
                <div ref={messagesEndRef} />
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
                <textarea
                  className="publisher-input"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  ref={htmlElRef}
                >
                  Write something
                </textarea>
                <span className="publisher-btn file-group">
                  <FontAwesomeIcon
                    icon={faPaperclip}
                    className="file-browser"
                  />
                  <input type="file" />
                </span>
                <a className="publisher-btn" data-abc="true">
                  <FontAwesomeIcon icon={faSmile} />
                </a>
                <button
                  type="submit"
                  className="send-btn"
                  onClick={sendMessage}
                >
                  <a className="publisher-btn text-info" data-abc="true">
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
