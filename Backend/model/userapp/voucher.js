const mongoose = require("mongoose");

const voucherSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      require: true,
    },
    voucherCode: {
      type: String,
    },
    discountPercentage: {
      type: String,
    },
    startDate: {
      type: String,
    },
    expDate: {
      type: String,
    },
    desc: {
      type: String,
    },
    htuse:{
      type:String
    }
  },
  {
    timestamps: true,
  }
);

const vouchermodel = mongoose.model("voucher", voucherSchema);
module.exports = vouchermodel;
