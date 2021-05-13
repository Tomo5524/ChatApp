import React, { useRef } from "react";

const Message = ({ msg, userName }) => {
  let isSender = msg.username === userName ? true : false;

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
