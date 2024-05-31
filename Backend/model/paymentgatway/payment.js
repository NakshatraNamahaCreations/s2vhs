const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;
const paymentgetwaymodel = new Schema({
  userId: {
    type: ObjectId,
  },
  vendorId: {
    type: String,
  },

  success: Boolean,
  code: String,
  message: String,
  data: {
    merchantId: String,
    merchantTransactionId: String,
    transactionId: String,
    amount: Number,
    state: String,
    responseCode: String,
    paymentInstrument: {
      type: String,
      pgTransactionId: String,
      pgServiceTransactionId: String,
      bankTransactionId: String,
      bankId: String,
    },
  },
  base64: String,
  sha256encode: String,

  amount: {
    type: String,
  },
  number: {
    type: String,
  },
  name: {
    type: String,
  },
  MUID: {
    type: String,
  },
  transactionId: {
    type: String,
  },
  serviceId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
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
  cardNumber: { type: String },
  expiryDate: { type: String },
  cvv: { type: String },
  expire_at: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
});
const Paymentgetwaymodel = mongoose.model(
  "paymentgetwaymodel",
  paymentgetwaymodel
);
module.exports = Paymentgetwaymodel;
