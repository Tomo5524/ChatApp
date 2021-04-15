import React from "react";

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
    <div>
      {isSender ? (
        <div className="media media-chat media-chat-reverse">
          <div className="media-body">
            <p>{msg.message}</p>
          </div>
        </div>
      ) : (
        <div className="media media-chat">
          <div className="media-body">
            <p>{msg.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
