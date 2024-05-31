const mongoose = require("mongoose");

const enquiryaddSchema = new mongoose.Schema(
  {
    // enquiryaddSchema is a MongoDB document
    EnquiryId: {
      //collections
      type: Number,
      default: 0,
    },
    date: {
      // collections
      type: String,
    },
    Time: {
      type: String,
    },
    executive: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    mobile: {
      type: String,
      require: true,
    },
    contact2: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    reference1: {
      type: String,
    },
    reference2: {
      type: String,
    },
    reference3: {
      type: String,
    },
    comment: {
      type: String,
      require: true,
    },
    intrestedfor: {
      type: String,
      require: true,
    },
    comment: {
      type: String,
    },
    folldate: {
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

    value: {
      type: String,
    },
    Area: {
      type: String,
    },
    bookedby: {
      type: String,
    },
    brancharea: {
      type: String,
    },
    company: {
      type: String,
    },
    serviceID: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

enquiryaddSchema.index({ EnquiryId: 1 });
const enquiryaddmodel = mongoose.model("enquiryadd", enquiryaddSchema);
module.exports = enquiryaddmodel;
