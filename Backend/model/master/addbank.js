const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema({
  accno: {
    type: String,
  },
  accname: {
    type: String,
  },
  branch: {
    type: String,
  },
  ifsccode: {
    type: String,
  },
  bankname: {
    type: String,
  },
  upinumber: {
    type: String,
  },
  creatAt:{
    type:Date,
    default:new Date(),
  }
});

const bankmodel = mongoose.model("bankacct", bankSchema);
module.exports = bankmodel;
