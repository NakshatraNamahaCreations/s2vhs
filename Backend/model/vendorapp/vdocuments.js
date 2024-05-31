const mongoose = require("mongoose");

const vdocumentsSchema = new mongoose.Schema({

  VendorId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  IDProof: {
    type: Array
  },
  BankDetails: {
    type: Array,

  },
  AddressProof: {
    type: Array,

  },
  IDproofImg: {
    type: String,

  },
  addrressProofImg: {
    type: String,

  },
  bankProofImg: {
    type: String,

  },
  IDProoftype: {
    type: String,
  },
  IDProofNo: {
    type: String,
  },
  addressProoftype: {
    type: String,
  },
  addressProofNo: {
    type: String,
  },
  bankName: {
    type: String,
  },
  accountNumber: {
    type: String,
  },
  confirmAccountNumber: {
    type: String,
  },
  branch: {
    type: String,
  },
  IFSC:{
    type:String
  }

}, {
  timestamps: true,
});

const vdocumentsmodel = mongoose.model("vdocuments", vdocumentsSchema);
module.exports = vdocumentsmodel;
