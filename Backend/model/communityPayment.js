const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const communityPaymentSchema = new mongoose.Schema(
  {
    amountPaidToCommunity: {
      type: Number,
    },
    paymentMode: {
      type: String,
    },
    comment: {
      type: String,
    },
    paymentAddedDate: {
      type: Date,
    },
    communityId: { type: Schema.Types.ObjectId, ref: "communities" },
  },
  { timestamps: true }
);

const communityPayment = mongoose.model(
  "communityPayment",
  communityPaymentSchema
);
module.exports = communityPayment;