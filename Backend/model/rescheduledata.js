const mongoose = require("mongoose");

const reshecduleSchema = new mongoose.Schema(
  {
    serviceDate: {
      type:  mongoose.Schema.Types.ObjectId,
    },
    serviceId: {
      type: String,
    },
    name: {
      type: String,
    },
    reason: {
      type: String,
    },
    number: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const recheduledatasmodel = mongoose.model("recheduledata", reshecduleSchema);
module.exports = recheduledatasmodel;
