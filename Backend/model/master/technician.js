const mongoose = require("mongoose");

const technicianSchema = new mongoose.Schema(
  {
    category: {
      type: Array,
    },
    Type: {
      type: String,
    },
    fcmtoken: {
      type: String,
    },
    city: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    vhsname: {
      type: String,
      require: true,
    },
    smsname: {
      type: String,
      require: true,
    },
    number: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    experiance: {
      type: String,
      require: true,
    },
    languagesknow: {
      type: String,
      require: true,
    },
    walletBalance: {
      type: String,
    },
    IDProof: {
      type: Boolean,
    },
    AddressProof: {
      type: Boolean,
    },
    BankProof: {
      type: Boolean,
    },
    vendorAmt: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const technicianmodel = mongoose.model("technician", technicianSchema);
module.exports = technicianmodel;
