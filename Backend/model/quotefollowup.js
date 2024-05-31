const mongoose = require("mongoose");

const quotefollowSchema = new mongoose.Schema({
  // enquiryaddSchema is a MongoDB document
  EnquiryId: {
    type: Number,
  },

  category: {
    type: String,
    require: true,
  },

  folldate: {
    type: String,
  },
  folltime: {
    type: String,
  },
  staffname: {
    type: String,
  },
  response: {
    type: String,
  },
  desc: {
    type: String,
  },

  nxtfoll: {
    type: String,
  },
  staffName: {
    type: String,
  },
  colorcode:{
    type:String
  }
}, {
  timestamps: true,
});

const quotefollowupModel = mongoose.model("quotefollowup", quotefollowSchema);
module.exports = quotefollowupModel;
