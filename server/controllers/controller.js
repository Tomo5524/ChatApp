var express = require("express");
var User = require("../models/user");
// var async = require("async");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const moment = require("moment-timezone");
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
        });
      } else {
        console.log("Incorrect Password");
        return res.status(401).json({ message: "Incorrect Password" });
      }
    });
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
