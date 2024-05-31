const mongoose = require("mongoose");

const headerSchema = new mongoose.Schema(
  {
    headerimg: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const headerimgmodel = mongoose.model("headerimg", headerSchema);
module.exports = headerimgmodel;
