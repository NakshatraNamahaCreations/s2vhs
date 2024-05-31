const mongoose = require("mongoose");

const AddoOnSchema = new mongoose.Schema({
  addOnsCategory: {
    type: String,
  },
  addOnsName: {
    type: String,
  },
  addOnsPrice: {
    type: Number,
    default: 0,
  },
  addOnsOfferPrice: {
    type: Number,
  },
  addOnsDescription: {
    type: String,
  },
  addOnsImage: {
    type: String,
  },
});

const AddOnsModel = mongoose.model("addOns", AddoOnSchema);
module.exports = AddOnsModel;