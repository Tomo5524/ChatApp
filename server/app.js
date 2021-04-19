require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const helmet = require("helmet");

const http = require("http");
const socketio = require("socket.io");

const mongoose = require("mongoose");
// needs model module
const mongoDb = process.env.MONGODB_URL;
mongoose.connect(mongoDb, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

var indexRouter = require("./routes/index");

var cors = require("cors");
const room = require("./models/room");
const { text } = require("express");
// const { Server } = require("tls");
var app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketio(server);

// socket is the user who just joined.
// each user has unique properites (id etc,,,)
io.on("connect", (socket) => {
  // console.log("user joined");

  socket.on("join", ({ username, roomName }) => {
    // console.log("new user joined");
    console.log(`${username} has joined!`);
    console.log(`$in ${roomName}`);
    socket.join(roomName);

    // /sending to sender-client only, e,g, everytime a new user joins, it will send out this message to only one person (the user) who just joined
    socket.emit("welcomeMessage", {
      message: `${username} welcome to ${roomName}!`,
      username,
    });
    //sending to all clients except sender, e,g, when new user joines, this message will send out to all the users except the user who just joined.
    socket.broadcast
      .to(roomName)
      .emit("message", { message: `${username} has joined!`, username });

    // socket.join(roomName);
    // get message from the front server
    socket.on("messeageSent", ({ message, roomName }) => {
      console.log(message, "msg");
      console.log(roomName, "roomName");
      console.log(message, "messageSent//////");
      // send message all the users in the room that was passed in from the client sever
      io.to(roomName).emit("message", { message, username });
    });
  });

  // // get message from the front server
  // socket.on("messeageSent", ({ message, roomName }) => {
  //   console.log(message, "msg");
  //   console.log(roomName, "roomName");
  //   console.log(message, "messageSent//////");
  //   // send message all the users in the room that was passed in from the client sever
  //   io.to(roomName).emit("message", { message }, username);
  // });

  // socket.on("disconnect", ({ username, roomName }) => {
  socket.on("disconnect", () => {
    console.log("user disconnected");
    // socket.broadcast
    //   .to(roomName)
    //   .emit("message", { message: `${username} has left the chat!`, username });

    // console.log(`${username} disconnected!//`);
  });
});

// in response headers, x-powered-by says express some hackers know I am useing express. Helmet removes headers (express) so nobody knows headers
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// app.use("/users", usersRouter);

// // Serve static assets if in production
// if (process.env.NODE_ENV === "production") {
//   require("dotenv").config();
//   // Set static folder
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);

module.exports = app;
