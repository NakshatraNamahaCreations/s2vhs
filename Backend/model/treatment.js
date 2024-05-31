const mongoose = require("mongoose");

const treatmentSchema = new mongoose.Schema(
  {
    EnquiryId: {
      type: Number,
    },
    userid: {
      type: String,
    },
    region: {
      type: String,
    },
    material: {
      type: String,
    },
    job: {
      type: String,
    },
    qty: {
      type: String,
    },
    rate: {
      type: String,
    },
    total: {
      type: String,
    },
    gst: {
      type: String,
    },
    subtotal: {
      type: String,
    },
    category: {
      type: String,
    },
    salesExecutive: {
      type: String,
    },
    note: {
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

const treatmentmodel = mongoose.model("treatment", treatmentSchema);
module.exports = treatmentmodel;
