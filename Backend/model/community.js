const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
  appartmentname: {
    type: String,
  },
  communityn: {
    type: String,
  },
  percentage: {
    type: String,
  },
  projectmanager: {
    type: String,
  },
  contactperson: {
    type: String,
  },
  contactno: {
    type: String,
  },
  email: {
    type: String,
  },
  login: {
    type: String,
  },
  password: {
    type: String,
  },
  cpassword: {
    type: String,
  },

  //give rights
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
}, {
  timestamps: true,
});

const communitymodel = mongoose.model("community", communitySchema);
module.exports = communitymodel;