const mongoose = require("mongoose");

const NumbersSchema = new mongoose.Schema({
  numbersCategory: {
    type: String,
  },
  whatsappNumber: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
});

const NumbersModel = mongoose.model("whatsappnumber", NumbersSchema);
module.exports = NumbersModel;