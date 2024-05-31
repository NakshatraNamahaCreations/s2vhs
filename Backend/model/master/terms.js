const mongoose = require("mongoose");

const termsSchema = new mongoose.Schema({
  header: {
    type: String,
    require: true,
  },
  content: {
    type: String,
  },
}, {
  timestamps: true,
});

const termsmodel = mongoose.model("terms", termsSchema);
module.exports = termsmodel;
