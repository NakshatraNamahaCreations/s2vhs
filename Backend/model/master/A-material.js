const mongoose=require("mongoose");

const amaterialSchema=new mongoose.Schema({
    category:{
        type:String
    },
    material:{
        type:String,
        require:true
    },
    benefits:{
        type:String,
    },
    creatAt:{
        type:Date,
        default:new Date(),
      }
});

const amaterialmodel=mongoose.model("amaterial",amaterialSchema);
module.exports=amaterialmodel;