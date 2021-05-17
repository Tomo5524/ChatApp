var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Controllers = require("../controllers/controller");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require("bcryptjs");
const moment = require("moment-timezone");

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    function (jwtPayload, done) {
      console.log("jwtStrategy got called");
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.

      User.findById(jwtPayload._id, (err, user) => {
        if (err) return done(err);
        if (!user) {
          return done(null, false, { message: "Username was not found" });
        } else {
          return done(null, user);
        }
      });
    }
  )
);

router.post("/api/sign-up", async (req, res, next) => {
  const { username, password } = req.body;
  // Simple validation
  if (!username || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: "Username is already taken" });
    }
    // hash password
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        console.log(err);
        return next(err);
        // return res.status(400).json({ msg: "Something went wrong hashing the password" });
        // throw Error('Something went wrong hashing the password');
      }
      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
        joinedDate: moment().format("ll"),
      });

      const savedUser = await newUser.save();
      if (!savedUser) throw Error("Something went wrong saving the user");

      // create token
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
      res.status(200).json({
        token,
        user: {
          _id: savedUser.id,
          username: savedUser.username,
          userSlug: savedUser.userSlug,
        },
      });
    });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ error: e.message });
  }
});

router.get("/api/rooms", Controllers.get_rooms);
router.get("/api/messages/:roomID", Controllers.get_messages);
router.post("/api/room-pass", Controllers.post_room_pass);
router.post("/api/login", Controllers.post_login);
router.post("/api/send-message", Controllers.post_message);
router.post("/api/create-room", Controllers.post_create_room);
router.post("/api/delete/:id", Controllers.post_delete);
router.post("/api/delete-room/:roomID", Controllers.post_delete_room);

module.exports = router;
