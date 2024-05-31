const mongoose = require("mongoose");

const enquiryfollowSchema = new mongoose.Schema({
  // enquiryaddSchema is a MongoDB document
  EnquiryId: {
    type: Number,

  },

  category: {
    type: String,
    require: true,
  },

  folldate: {
    type: String,
  },
  staffname: {
    type: String,
  },
  response: {
  },
  desc: {
    type: String,
  },
  value: {
    type: String,
    default:"00.00"
    },
  colorcode: {
    type: String,
  },
  nxtfoll: {
    type: String,
  },
  staffName: {
    type: String,
  },
  reasonForCancel:{
    type:String
  },
  cancelStatus:{
    type:String
  },
  technicianname:{
    type:String
  },
  appoDate:{
    type:String
  },
  appoTime:{
    type:String
  },
  sendSms:{
    type:String
  },
  status:{
    type:String
  },
  slotid:{
    type:String
  },
  userId:{
    type:String
  },
  type:{
    type:String
  },
  responseType:{
    type:String
  },
  techId:{
    type:String
  },
  adminname: {
    type: String,
  },
  admindate: {
    type: String,
  },
}, {
  timestamps: true,
});
enquiryfollowSchema.index({ EnquiryId: 1 });
const enquiryfollowupModel = mongoose.model("enquiryfollowup", enquiryfollowSchema);
module.exports = enquiryfollowupModel;
