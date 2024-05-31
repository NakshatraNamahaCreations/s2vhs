const mongoose = require("mongoose");

const appsubcatSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  subcategory: {
    type: String,
  },
  sub_subcategory: {
    type: String,
  },
  resubcatimg: {
    type: String,
  },

}, {
  timestamps: true,
});

const appresubcatModel = mongoose.model("appresubcat", appsubcatSchema);
module.exports = appresubcatModel;
