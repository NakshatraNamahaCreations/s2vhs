
const mongoose = require('mongoose');

// Define the user schema
const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  count: { type: Number, required: true, default: 0 },
 
}, {
  timestamps: true,
});

// Create the user model
const countermodel = mongoose.model('counter', counterSchema);
module.exports=countermodel


