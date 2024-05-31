const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  crdate: {
    type: String,
  },
  projectmanager: {
    type: String,
  },
  salesexecutive:{
    type:String
  },
  customer: {
    type: String,
    require: true,
  },
  contactno: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  quoteno: {
    type: String,
    require: true,
  },
  projecttype: {
    type: String,
    require: true,
  },
  daytocomplete: {
    type: String,
    require: true,
  },
  worker: {
    type: String,
    require: true,
  },
  vendorpayment: {
    type: String,
  },
  charges: {
    type: String,
  },
  quotevalue: {
    type: String,
  },
  payment: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
 
}, {
  timestamps: true,
});

const projectmodel = mongoose.model("project", projectSchema);
module.exports = projectmodel;
