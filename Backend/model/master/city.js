const mongoose=require("mongoose");

const citySchema=new mongoose.Schema({
    city:{
        type:String,
        
    },
    creatAt:{
        type:Date,
        default:new Date(),
      }
   
});

const cityymodel=mongoose.model("mastercity",citySchema);
module.exports=cityymodel;