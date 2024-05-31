const mongoose = require("mongoose");

const footerimgSchema = new mongoose.Schema(
  {
    footerimg: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const headerimgmodel = mongoose.model("footerimg", footerimgSchema);
module.exports = headerimgmodel;
