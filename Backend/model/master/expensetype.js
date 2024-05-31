const mongoose=require("mongoose");

const expensetypeSchema=new mongoose.Schema({
    expensetype:{
        type:String,
        require:true
    },
    creatAt:{
        type:Date,
        default:new Date(),
      }
   
});

const expensetypemodel=mongoose.model("masterexpensetype",expensetypeSchema);
module.exports=expensetypemodel;