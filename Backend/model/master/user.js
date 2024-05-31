const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uId: {
    type: String,
  },
  categoryId: {
    type: String,
  },
  cityId: {
    type: String,
  },

  displayname: {
    type: String,
  },
  contactno: {
    type: String,
  },
  loginnameOrEmail: {
    type: String,
  },
  password: {
    type: String,
  },
  oldPassword: {
    type: String,
  },
  newPassword: {
    type: String,
  },
  newConfirmPassword: {
    type: String,
  },
  home: {
    type: Boolean,
  },
  master: {
    type: Boolean,
  },
  enquiry: {
    type: Boolean,
  },
  enquiryFollowup: {
    type: Boolean,
  },
  survey: {
    type: Boolean,
  },
  quote: {
    type: Boolean,
  },
  customer: {
    type: Boolean,
  },
  quoteFollowup: {
    type: Boolean,
  },
  dsr: {
    type: Boolean,
  },
  runningProjects: {
    type: Boolean,
  },
  closeProjects: {
    type: Boolean,
  },
  b2b: {
    type: Boolean,
  },
  community: {
    type: Boolean,
  },
  reports: {
    type: Boolean,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  paymentReport:{
    type: Boolean,
  },
  status:{
    type:String
  },
  category: {
    type: Array, // Change to an array of strings
  },
  city: {
    type: Array, // Change to an array of strings
  },
}, {
  timestamps: true,
});

const usermodel = mongoose.model("masteruser", userSchema);
module.exports = usermodel;