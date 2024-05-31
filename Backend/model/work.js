const mongoose = require("mongoose");

const workchema = new mongoose.Schema({
  workDate: {
    type: String,
  },
  workMileStone: {
    type: String,
  },
  workMaterialUse: {
    type: String,
  },
  workDetails:{
    type: String,
  },
  workRemark: {
    type: String,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customers' // Assuming your Customer model is named 'Customer'
  },
  serviceId:{
    type: mongoose.Schema.Types.ObjectId,

  }
}, {
  timestamps: true,
});

const Work = mongoose.model("work", workchema);
module.exports = Work;
