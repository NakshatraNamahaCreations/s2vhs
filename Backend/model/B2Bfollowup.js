const mongoose = require("mongoose");

const b2bfollowSchema = new mongoose.Schema(
  {
    // enquiryaddSchema is a MongoDB document
    B2BId: {
      type: Number,
    },

    category: {
      type: String,
      require: true,
    },

    folldate: {
      type: String,
    },
    staffname: {
      type: String,
    },
    response: {},
    desc: {
      type: String,
    },
    value: {
      type: String,
      default: "00.00",
    },
    colorcode: {
      type: String,
    },
    nxtfoll: {
      type: String,
    },
    staffName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const b2bfollowupModel = mongoose.model("b2bfollowup", b2bfollowSchema);
module.exports = b2bfollowupModel;
