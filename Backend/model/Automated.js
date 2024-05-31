const mongoose = require("mongoose");

// Define the user schema
const automatedServiceSchema = new mongoose.Schema(
  {
    Automated: {
      type: Boolean,

      default: false,
    },
    city: {
      type: String,
    },
    category: {
      type: String,
    },
    datewise: {
      type: String,
    },
    action: { type: Boolean },
    discount: { type: Number },
  },
  {
    timestamps: true,
  }
);

// Create the user model
const automatedServiceModel = mongoose.model(
  "automatedService",
  automatedServiceSchema
);
module.exports = automatedServiceModel;
