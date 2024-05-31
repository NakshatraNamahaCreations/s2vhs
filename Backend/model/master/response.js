const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
  {
    response: {
      type: String,
    },
    template: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const responsemodel = mongoose.model("response", responseSchema);
module.exports = responsemodel;
