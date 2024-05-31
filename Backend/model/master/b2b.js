const mongoose=require("mongoose");

const b2bSchema=new mongoose.Schema({
    customertype:{
        type:String,
        require:true
    },
    creatAt:{
        type:Date,
        default:new Date(),
      }
   
});

const b2bmodel=mongoose.model("masterb2b",b2bSchema);
module.exports=b2bmodel;