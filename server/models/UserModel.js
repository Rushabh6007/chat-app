const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "provide firstname"],
    },
    lastname: {
      type: String,
      required: [true, "provide lastname"],
    },
    email: {
      type: String,
      required: [true, "provide email"],
      // unique: true,
    },
    password: {
      type: String,
      required: [true, "provide password"],
    },
    mobileno:{
      type: String,
      required: [true, "provide mobileno"],
      unique: true
    },
    profile_pic: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
