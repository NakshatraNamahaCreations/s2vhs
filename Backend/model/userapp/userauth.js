const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    number: {
      type: String,
    },
    password: {
      type: String,
    },
    cpassword: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("userlogin", userSchema);
module.exports = userModel;
