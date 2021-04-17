import React, { useRef } from "react";

const Message = ({ msg, userName }) => {
  // console.log("🚀 ~ file: message.js ~ line 4 ~ Message ~ userName", userName);
  // console.log("🚀 ~ file: message.js ~ line 4 ~ Message ~ msg", msg);
  let isSender = msg.username === userName ? true : false;
  // console.log(
  //   msg,
  //   userName,
  //   "msg and username in message component///////////"
  // );
  // console.log("🚀 ~ file: message.js ~ line 6 ~ Message ~ isSender", isSender);

  return (
    <div className="messages">
      {isSender ? (
        <div className="messageContainer justify-content-end">
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{msg.message}</p>
          </div>
        </div>
      ) : (
        <div className="messageContainer justify-content-start">
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{msg.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
