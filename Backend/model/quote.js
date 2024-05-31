const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quoteaddSchema = new mongoose.Schema(
  {
    Id: {
      type: String,
    },
    quoteId: {
      type: Number,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "enquiryadd",
    },
    EnquiryId: {
      type: Number,
    },
    projectType: {
      type: String,
    },
    SUM: {
      type: String,
    },
    GST: {
      type: Boolean,
    },
    total: {
      type: String,
    },
    adjustments: {
      type: String,
    },
    netTotal: {
      type: String,
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    Bookedby: {
      type: String,
    },
    salesExecutive: {
      type: String,
    },
    exenumber: {
      type: String,
    },
    type:{
      type: String,
    },
    exeId:{
      type: String,
    },
    number:{
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const quotemodel = mongoose.model("quote", quoteaddSchema);
module.exports = quotemodel;
