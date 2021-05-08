var express = require("express");
var User = require("../models/user");
var Room = require("../models/room");
// var async = require("async");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const moment = require("moment-timezone");
const { body, validationResult } = require("express-validator");

exports.post_login = function (req, res, next) {
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) {
      console.log(err, "err///////////");
      return next(err);
    }
    if (!user) {
      console.log("No user found");
      return res.status(401).json({ message: "No user found" });
    }
    bcrypt.compare(password, user.password, (err, success) => {
      if (err) {
        console.log(err, "after bcrypt validation err///////////");
        return next(err);
      }
      if (success) {
        // console.log("token needed");
        const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
        console.log(token, "token//////////");
        return res.status(200).json({
          message: "User authenticated",
          token,
          user,
          // slug: savedUser.slug,
        });
      } else {
        console.log("Incorrect Password");
        return res.status(401).json({ message: "Incorrect Password" });
      }
    });
  });
};

exports.get_rooms = async (req, res, next) => {
  try {
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
  // Room.findOne({ roomName: req.params.slug }).exec((err, room) => {
  //   if (err) {
  //     return next(err);
  //   }
  //   // Successful, so render
  //   console.log(
  //     "🚀 ~ file: controller.js ~ line 12 ~ Room.findOne ~ room",
  //     room
  //   );
  //   res.status(200).json(post);
  //   // res.json(posts);
  // });
};

exports.post_room_pass = async (req, res, next) => {
  // console.log(req, "req got called");
  console.log("post pass room pass called");
  console.log(req.body, "req.body");
  console.log(req.body.data.room, "req.body.data.room");
  try {
    const PrivateRoom = await Room.find({ roomName: req.body.data.room });
    console.log(PrivateRoom, "PrivateRoom///////");
    if (PrivateRoom === undefined || PrivateRoom.length == 0) {
      // res.status(200).json(PrivateRoom);
      // console.log(`Successfully deleted document that had the form: ${Rooms}.`);
      // no existing room with that requested name.
      console.log("No document matches the provided query.");
      return res.status(404).json({ message: "No room found" });
    } else {
      console.log(req.body.data.password, "req.body.data.password///////");
      console.log(PrivateRoom[0].password, "PrivateRoom.password/////");
      if (req.body.data.password === PrivateRoom[0].password) {
        res.status(200).json(PrivateRoom);
        // console.log(`Successfully fetched document that had the form: ${PrivateRoom}.`);
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
  // Room.findOne({ roomName: req.params.slug }).exec((err, room) => {
  //   if (err) {
  //     return next(err);
  //   }
  //   // Successful, so render
  //   console.log(
  //     "🚀 ~ file: controller.js ~ line 12 ~ Room.findOne ~ room",
  //     room
  //   );
  //   res.status(200).json(post);
  //   // res.json(posts);
  // });
};

exports.get_messages = async (req, res, next) => {
  try {
    // what is the best way to grab one document by id
    // const room = await Room.findOne({ _id: req.body.roomID });
    const room = await Room.findById(req.params.roomID);
    if (room) {
      res.status(200).json(room);
      // console.log(
      //   `Successfully grabbed the document (messages of the currnet room): ${room}.`
      // );
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
    // what is the best way to grab one document by id
    // const room = await Room.findOne({ _id: req.body.roomID });
    const room = await Room.findById(req.body.outputMessage.roomID);
    if (room) {
      // updateOne is more optimized https://stackoverflow.com/questions/3961322/best-practice-for-updating-a-mongodb-collection-with-unknown-modified-fields
      const updatedRoom = await room.updateOne({
        $set: { messages: [...room.messages, req.body.outputMessage] },
      });
      // console.log(
      //   "🚀 ~ file: controller.js ~ line 97 ~ exports.post_message= ~ updatedRoom",
      //   updatedRoom
      // );
      // room.messages([...room.messages, req.body.message])
      // await room.save()
      res.status(200).json(updatedRoom);
      // console.log(`Successfully deleted document that had the form: ${Rooms}.`);
    } else {
      console.log("in post message");
      console.log("No document matches the provided query.");
    }
  } catch (err) {
    console.error(`Failed to find and delete document: ${err}`);
  }
  // const room = new Room({
  //   roomName: req.body.roomname,
  //   // messages: [],
  //   createdDate: moment().tz("Asia/Tokyo").format("lll"),
  // });
  // const savedRoom = await newRoom.save();
  // console.log(newRoom, "newRoom/////////");
  // if (!newRoom) throw Error("Something went wrong saving the user");
  // res.status(200).json({
  //   // savedRoom,
  //   id: savedRoom.id,
  //   roomName: savedRoom.roomName,
  //   // createdDate: savedRoom.createdDate,
  //   roomSlug: savedRoom.roomSlug,
  // });
};

exports.post_create_room = async (req, res, next) => {
  console.log(req.body, "req.body/////");
  console.log(req.body.private, "Private req body/////");
  // Validate and santise the name field.
  // body("title", "Name must be between 1 and 200 characters")
  //   .isLength({ min: 1, max: 200 })
  //   .escape(),
  // body("description", "Name must be more than 1 character")
  //   .isLength({ min: 1 })
  //   .escape(),
  // console.log(req.body, "req.body");
  // const errors = validationResult(req);

  const newRoom = new Room({
    roomName: req.body.roomname,
    // messages: [],
    // users: [req.body.userID]
    isPrivate: req.body.private,
    password: req.body.password,
    createdDate: moment().tz("Asia/Tokyo").format("lll"),
  });
  const savedRoom = await newRoom.save();
  if (!newRoom) throw Error("Something went wrong saving the user");
  console.log(newRoom, "newRoom/////////");
  res.status(200).json({
    // savedRoom,
    id: savedRoom.id,
    roomName: savedRoom.roomName,
    // createdDate: savedRoom.createdDate,
    roomSlug: savedRoom.roomSlug,
  });
};

exports.post_delete = async (req, res, next) => {
  console.log(
    req.params,
    "this is req.params.id from delete post///////////////////////////"
  );
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
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
  // this delete error handling from official document
  // return await User.findByIdAndDelete(req.params.id)
  //   .then((deletedDocument) => {
  //     if (deletedDocument) {
  //       console.log(
  //         `Successfully deleted document that had the form: ${deletedDocument}.`
  //       );
  //     } else {
  //       console.log("No document matches the provided query.");
  //     }
  //     // return deletedDocument;
  //   })
  //   .catch((err) =>
  //     console.error(`Failed to find and delete document: ${err}`)
  //   );
};

exports.post_delete_room = async (req, res, next) => {
  console.log(
    req.params,
    "this is req.params.id from delete post///////////////////////////"
  );
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
