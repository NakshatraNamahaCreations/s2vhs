const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const profileimg = new Schema({
  profileimg: {
    type: String,
  },
  userId: {
    type: ObjectId,
  },
  content: {
    type: String,
  },
});

const profileModel = mongoose.model("profile", profileimg);
module.exports = profileModel;
