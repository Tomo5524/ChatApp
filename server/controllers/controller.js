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

exports.post_delete = (req, res, next) => {
  console.log(
    req.params.username,
    "this is req.params.id///////////////////////////"
  );
  User.findOneAndDelete({ username: req.params.username }, (err) => {
    console.log("delete got called");
    if (err) {
      console.log(err, "this is err msg ////////////////////");
      // return res.status(401).json(err);
    }
  });
};
