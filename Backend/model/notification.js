const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },

    body: {
      type: String,
    },
    notification: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const notificationmodel = mongoose.model("notification", notificationSchema);
module.exports = notificationmodel;
