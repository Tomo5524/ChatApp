const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true, minlength: 4 },
  joinedDate: { type: String },
});

module.exports = mongoose.model("user", UserSchema);
