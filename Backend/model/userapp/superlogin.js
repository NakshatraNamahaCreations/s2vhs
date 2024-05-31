const mongoose = require("mongoose");

const superloginSchema = new mongoose.Schema({
  
  emailorphone: {
    type: String,
  },
  password: {
    type: String,
  },
   cpassword: {
    type: String,
  },
  oldPassword:{
    type:String
  },
  newPassword:{
    type:String
  },
  newcPassword:{
    type:String
  },
 
}, {
  timestamps: true,
});

const superloginmodel = mongoose.model("superlogin", superloginSchema);
module.exports = superloginmodel;