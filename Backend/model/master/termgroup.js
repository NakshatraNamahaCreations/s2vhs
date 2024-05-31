const mongoose = require("mongoose");

const termsgroupSchema = new mongoose.Schema({
  seqno: {
    type: String,
    require: true,
  },
  termsgroup: {
    type: String,
  },
  terms:{
    type:String
  },
  category:{
    type:String
  },
  header:{
    type:String
  },
  content:{
    type:String
  },
  type:{
    type:String
  }
}, {
  timestamps: true,
});

const termsgroupmodel = mongoose.model("termsgroup", termsgroupSchema);
module.exports = termsgroupmodel;
