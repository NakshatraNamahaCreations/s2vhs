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
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customers' // Assuming your Customer model is named 'Customer'
  },
  serviceId:{
    type: mongoose.Schema.Types.ObjectId,

  }
}, {
  timestamps: true,
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
