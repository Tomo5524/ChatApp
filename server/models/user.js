const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true, minlength: 4 },
  joinedDate: { type: String },
  userSlug: {
    type: String,
    required: true,
  },
});

// postSchema.pre("validate", function ()=> {} { // doest not work
UserSchema.pre("validate", function (next) {
  console.log("pre gets called/////////////");
  if (this.username) {
    this.userSlug = slugify(this.username, {
      // replacement: "-", // replace spaces with replacement character, defaults to `-`
      lower: true, // convert to lower case, defaults to `false`
      strict: true, // strip special characters except replacement, defaults to `false`
    });
  }
  next();
});

module.exports = mongoose.model("user", UserSchema);
