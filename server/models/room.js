const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");

const RoomSchema = new Schema({
  roomName: { type: String, unique: true, required: true },
  createdDate: { type: String },
  messages: [{ type: [Object] }],
  roomSlug: {
    type: String,
    required: true,
  },
});

// postSchema.pre("validate", function ()=> {} { // doest not work
RoomSchema.pre("validate", function (next) {
  console.log("pre gets called/////////////");
  if (this.roomName) {
    this.roomSlug = slugify(this.roomName, {
      // replacement: "-", // replace spaces with replacement character, defaults to `-`
      lower: true, // convert to lower case, defaults to `false`
      strict: true, // strip special characters except replacement, defaults to `false`
    });
  }
  next();
});

module.exports = mongoose.model("room", RoomSchema);
