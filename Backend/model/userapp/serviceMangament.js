const mongoose = require("mongoose");

const serviceManagementSchema = new mongoose.Schema({
  serviceImg: {
    type: String,
  },
  serviceName: {
    type: String,
  },
  Subcategory: {
    type: String,
  },
  serviceCategory: {
    type: String,
  },
  NofServiceman: {
    type: String,
  },
  offerPrice: {
    type: String,
  },
  serviceHour: {
    type: String,
  },
  serviceDesc: {
    type: Array,
  },
  Inimg: {
    type: String,
  },
  Eximg: {
    type: String,
  },
  Desimg: {
    type: String,
  },
  servicePrice: {
    type: String,
  },

  serviceGst: {
    type: String,
  },
  plans: {
    type: Array,
  },
  Plansdetails: {
    type: Array,
  },
  store_slots: {
    type: Array,
  },
  sub_subcategory: {
    type: String,
  },
  serviceExcludes: {
    type: Array,
  },
  category: {
    type: String,
  },
  serviceIncludes: {
    type: Array,
  },
  rating: {
    type: String,
  },
  morepriceData: [
    {
      id: String,
      pricecity: String,
      pName: String,
      pofferprice: String,
      pPrice: String,
      pservices: String,
      servicePeriod: String,
    },
  ],
  quantity: {
    type: Number,
    default: 1,
  },
  sAddons: {
    type: Array,
  },
  qty: {
    type: String,
    default: 1,
  },
  servicetitle: {
    type: String,
  },
  servicebelow: {
    type: String,
  },
  homepagetitle: {
    type: String,
  },
  serviceDirection: {
    type: String,
  },
  activeStatus: {
    type: Boolean,
  },
});

const serviceManagementModel = mongoose.model(
  "serviceManagement",
  serviceManagementSchema
);
module.exports = serviceManagementModel;
