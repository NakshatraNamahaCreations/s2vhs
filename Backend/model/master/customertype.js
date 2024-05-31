const mongoose=require("mongoose");

const customertypeSchema=new mongoose.Schema({
    customertype:{
        type:String,
        require:true
    },
    creatAt:{
        type:Date,
        default:new Date(),
      }
   
});

const customertypemodel=mongoose.model("mastercustomertype",customertypeSchema);
module.exports=customertypemodel;