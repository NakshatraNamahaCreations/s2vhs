const mongoose = require("mongoose");

const addCallSchema = new mongoose.Schema(
  {
    // enquiryaddSchema is a MongoDB document
    cardNo: {
      //collections
      type: Number,
    },
    EnquiryId: {
      type: Number,
    },
    serviceInfo: {
      type: Array,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    serviceDate: {
      type: String,
    },
    bookingDate: {
      // collections
      type: String,
    },
    category: {
      type: String,
    },
    jobCategory: {
      type: String,
    },
    complaintRef: {
      type: Number,
    },
    priorityLevel: {
      type: String,
    },
    appoDate: {
      type: String,
    },
    appoTime: {
      type: String,
    },
    customerFeedback: {
      type: String,
    },
    workerName: {
      type: String,
    },
    workerAmount: {
      type: String,
    },
    daytoComplete: {
      type: String,
    },
    techComment: {
      type: String,
    },
    backofficerExe: {
      type: String,
    },
    backofficerno: {
      type: String,
    },
    techName: {
      type: String,
    },
    showinApp: {
      type: String,
    },
    type: {
      type: String,
    },
    sendSms: {
      type: String,
    },
    inSignDateTime: {
      type: String,
    },
    outSignDateTime: {
      type: String,
    },
    jobComplete: {
      type: String,
    },
    amount: {
      type: String,
    },
    salesExecutive: {
      type: String,
    },
    jobType: {
      type: String,
    },
    TechorPMorVendorID: {
      type: String,
    },
    TechorPMorVendorName: {
      type: String,
    },
    startJobTime: {
      type: Date,
    },
    endJobTime: {
      type: Date,
    },
    endJobReason: {
      type: String,
    },
    jobAmount: {
      type: String,
    },
    paymentType: {
      type: String,
    },
    chemicals: {
      type: String,
    },
    remarkOrComments: {
      type: String,
    },
    BackofficeExecutive: {
      type: String,
    },
    cancelOfficerName: {
      type: String,
    },
    cancelOfferNumber: {
      type: String,
    },
    reason: {
      type: String,
    },
    cancelDate: {
      type: String,
    },
    Tcancelreason: {
      type: String,
    },
    Tcanceldate: {
      type: String,
    },
    jobStatus: {
      type: String,
    },
    Tcancelname: {
      type: String,
    },
    rescheduledate: {
      type: String,
    },
    reschedulereason: {
      type: String,
    },
    Tname: {
      type: String,
    },
    rescheduletime: {
      type: String,
    },
    vendorAmt: {
      type: Number,
    },
    vendorChargeAmount: {
      type: String,
    },
    vVendor: {
      type: String,
    },
    sImg: {
      type: String,
    },
    bImg: {
      type: String,
    },
    pImg: {
      type: String,
    },
    dsImg: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const addcallModel = mongoose.model("addcall", addCallSchema);
module.exports = addcallModel;
