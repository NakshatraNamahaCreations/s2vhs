const mongoose=require("mongoose");

const pmaterialSchema=new mongoose.Schema({
    pmaterial:{
        type:String,
        
    },
    creatAt:{
        type:Date,
        default:new Date(),
      }
   
});

const pmaterialymodel=mongoose.model("masterpmaterial",pmaterialSchema);
module.exports=pmaterialymodel;