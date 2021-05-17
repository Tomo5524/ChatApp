var express = require("express");
var User = require("../models/user");
var Room = require("../models/room");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const moment = require("moment-timezone");
const { body, validationResult } = require("express-validator");

exports.post_login = function (req, res, next) {
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "No user found" });
    }
    bcrypt.compare(password, user.password, (err, success) => {
      if (err) {
        return next(err);
      }
      if (success) {
        const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
        return res.status(200).json({
          message: "User authenticated",
          token,
          user,
          // user: {
          // id: savedUser.id,
          // username: savedUser.username,
          // userSlug: savedUser.userSlug,
          // },
          // slug: savedUser.slug,
        });
      } else {
        return res.status(401).json({ message: "Incorrect Password" });
      }
    });
  });
};

exports.get_rooms = async (req, res, next) => {
  try {
    // get public rooms from db
    const Rooms = await Room.find({ isPrivate: "false" });
    if (Rooms) {
      res.status(200).json(Rooms);
      // console.log(`Successfully deleted document that had the form: ${Rooms}.`);
    } else {
      console.log("No document matches the provided query.");
    }
  } catch (err) {
    console.log("in get rooms");
    console.error(`Failed to find and document for all the rooms: ${err}`);
  }
};

exports.post_room_pass = async (req, res, next) => {
  // fetched using axios
  try {
    // roomID is not knows at this point so search room by its name
    const PrivateRoom = await Room.find({ roomName: req.body.data.room });
    console.log(PrivateRoom, "PrivateRoom///////");
    if (PrivateRoom === undefined || PrivateRoom.length == 0) {
      // no existing room with that requested name.
      return res.status(404).json({ message: "No room found" });
    } else {
      // simple room password validation
      if (req.body.data.password === PrivateRoom[0].password) {
        res.status(200).json(PrivateRoom);
      } else {
        // password doest not match.
        res.status(200).json({ message: "Incorrect password" });
      }
    }
  } catch (err) {
    console.log("in get rooms");
    console.error(
      `Failed to find and document for the requested private room: ${err}`
    );
    return res.status(500).json({ message: "Something went wrong." });
  }
};

exports.get_messages = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.roomID);
    if (room) {
      res.status(200).json(room);
    } else {
      console.log("No document matches the provided query.");
    }
  } catch (err) {
    console.log("in get messages");
    console.error(`Failed to find and document: ${err}`);
  }
};

exports.post_message = async (req, res, next) => {
  console.log(req.body, "req.body/////");
  try {
    const room = await Room.findById(req.body.outputMessage.roomID);
    if (room) {
      // updateOne is more optimized https://stackoverflow.com/questions/3961322/best-practice-for-updating-a-mongodb-collection-with-unknown-modified-fields
      const updatedRoom = await room.updateOne({
        $set: { messages: [...room.messages, req.body.outputMessage] },
      });
      res.status(200).json(updatedRoom);
    } else {
      console.log("in post message");
      console.log("No document matches the provided query.");
    }
  } catch (err) {
    console.error(`Failed to find and delete document: ${err}`);
  }
};

exports.post_create_room = async (req, res, next) => {
  const newRoom = new Room({
    roomName: req.body.roomname,
    isPrivate: req.body.private,
    password: req.body.password,
    createdDate: moment().tz("Asia/Tokyo").format("lll"),
    // messages: [],
    // users: [req.body.userID]
  });
  const savedRoom = await newRoom.save();
  if (!newRoom) throw Error("Something went wrong saving the user");
  console.log(newRoom, "newRoom/////////");
  res.status(200).json({
    id: savedRoom.id,
    roomName: savedRoom.roomName,
    roomSlug: savedRoom.roomSlug,
    // savedRoom,
    // createdDate: savedRoom.createdDate,
  });
};

exports.post_delete = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    // for debuging purpose
    if (deletedUser) {
      console.log(
        `Successfully deleted document that had the form: ${deletedUser}.`
      );
    } else {
      console.log("No document matches the provided query.");
    }
  } catch (err) {
    console.error(`Failed to find and delete document: ${err}`);
  }
};

exports.post_delete_room = async (req, res, next) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.roomID);
    if (deletedRoom) {
      console.log(
        `Successfully deleted document that had the form: ${deletedRoom}.`
      );
    } else {
      console.log("No document matches the provided query.");
    }
  } catch (err) {
    console.error(`Failed to find and delete document: ${err}`);
  }
};
