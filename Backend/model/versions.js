const mongoose = require("mongoose");

const versionsSchema = new mongoose.Schema(
  {
   
    versions: {
      type: String,
    },
   
  },
  {
    timestamps: true,
  }
);

const versionsmodel = mongoose.model("versions", versionsSchema);
module.exports = versionsmodel;
