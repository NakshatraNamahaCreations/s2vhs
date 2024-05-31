const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
  {
    templatename: {
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

const whatsappmodel = mongoose.model("whatsapptemplate", responseSchema);
module.exports = whatsappmodel;
