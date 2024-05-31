const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
    },
    subcategory: {
      type: String,
    },
    serviceName: {
      type: String,
    },
    subcategoryimage: {
      type: String,
    },
    videolink: {
      type: String,
    },
    serivceID: {
      type: String, //04-10
    },
  },
  {
    timestamps: true,
  }
);

const subcategoryModel = mongoose.model("subcategory", subcategorySchema);
module.exports = subcategoryModel;
