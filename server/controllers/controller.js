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
    const Rooms = await Room.find();
    if (Rooms) {
      res.status(200).json(Rooms);
      // console.log(`Successfully deleted document that had the form: ${Rooms}.`);
    } else {
      console.log("No document matches the provided query.");
    }
  } catch (err) {
    console.error(`Failed to find and delete document: ${err}`);
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
      console.log(`Successfully deleted document that had the form: ${Rooms}.`);
    } else {
      console.log("No document matches the provided query.");
    }
  } catch (err) {
    console.error(`Failed to find and delete document: ${err}`);
  }
};

exports.post_message = async (req, res, next) => {
  console.log(req.body, "req.body/////");
  try {
    // what is the best way to grab one document by id
    // const room = await Room.findOne({ _id: req.body.roomID });
    const room = await Room.findById(req.body.roomID);
    if (room) {
      // updateOne is more optimized https://stackoverflow.com/questions/3961322/best-practice-for-updating-a-mongodb-collection-with-unknown-modified-fields
      const updatedRoom = await room.updateOne({
        $set: { messages: [...room.messages, req.body.message] },
      });
      console.log(
        "🚀 ~ file: controller.js ~ line 97 ~ exports.post_message= ~ updatedRoom",
        updatedRoom
      );
      // room.messages([...room.messages, req.body.message])
      // await room.save()
      res.status(200).json(updatedRoom);
      // console.log(`Successfully deleted document that had the form: ${Rooms}.`);
    } else {
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
    createdDate: moment().tz("Asia/Tokyo").format("lll"),
  });
  const savedRoom = await newRoom.save();
  console.log(newRoom, "newRoom/////////");
  if (!newRoom) throw Error("Something went wrong saving the user");
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
