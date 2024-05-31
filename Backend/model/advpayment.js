const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  paymentDate: {
    type: String,
  },
  paymentType: {
    type: String,
  },
  paymentMode: {
    type: String,
  },
  amount:{
    type: String,
  },
  Comment: {
    type: String,
  },
  serviceDate:{
    type: String,
  },
  EnquiryId: {
    type: Number,
  
  },
  userID:{
    type: mongoose.Schema.Types.ObjectId,

  }
}, {
  timestamps: true,
});

const advPayment = mongoose.model("advPayment", paymentSchema);
module.exports = advPayment;
