const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    customerData: {
      type: Array,
    },
    EnquiryId: {
      type: Number,
      default: 0,
    },
    km: {
      type: Number,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    selectedSlotText: {
      type: String,
    },
    cardNo: {
      type: Number,
    },
    category: {
      type: String,
    },
    dCategory: {
      type: String,
    },
    contractType: {
      type: String,
    },
    service: {
      type: String,
    },
    serviceID: {
      type: String,
    },
    status: {
      type: String,
    },
    planName: {
      type: String,
    },
    serviceCharge: {
      type: String,
    },
    dateofService: {
      type: Array,
      default: "00-00-0000",
    },
    deliveryAddress: {
      type: Object,
    },
    desc: {
      type: String,
    },
    markerCoordinate: {
      type: Object,
    },
    serviceFrequency: {
      type: String,
    },
    startDate: {
      type: String,
      default: "00-00-0000",
    },
    expiryDate: {
      type: String,
      default: "00-00-0000",
    },
    firstserviceDate: {
      type: String,
      default: "00-00-0000",
    },
    dividedDates: {
      type: Array,
    },
    dividedCharges: {
      type: Array,
    },
    dividedamtDates: {
      type: Array,
    },
    dividedamtCharges: {
      type: Array,
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    closeProject: {
      type: String,
    },
    closeDate: {
      type: String,
    },
    BackofficeExecutive: {
      type: String,
    },
    oneCommunity: {
      type: String,
    },
    techName: {
      type: String,
      default: "",
    },
    status: {
      type: String,
    },
    appoDate: {
      type: String,
    },
    appotime: {
      type: String,
    },
    ResheduleUser: {
      type: String,
    },
    ResheduleUsernumber: {
      type: String,
    },
    reason: {
      type: String,
    },
    resDate: {
      type: String,
    },
    type: {
      type: String,
    },
    paymentMode: {
      type: String,
    },
    GrandTotal: {
      type: String,
    },
    AddOns: {
      type: Array,
    },
    discAmt: {
      type: String,
    },
    couponCode: {
      type: String,
    },
    totalSaved: {
      type: String,
    },
    TotalAmt: {
      type: String,
    },
    city: {
      type: String,
    },
    slots: {
      type: String, //03-10
    },
    videoLink: {
      type: String, //03-10
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
    TArrayId: {
      type: Array,
    },
    TechIds: {
      type: Array,
    },
    cancelDate: {
      type: String,
    },
    newappoDate: {
      type: String,
    },
    complaint: {
      type: String,
    },
    ctechName: {
      type: String,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    communityId: { type: mongoose.Schema.Types.ObjectId, ref: "community" },
    creatAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

const servicedetailsmodel = mongoose.model("servicedetails", serviceSchema);
module.exports = servicedetailsmodel;
