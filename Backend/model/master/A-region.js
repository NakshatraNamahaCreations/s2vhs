const mongoose=require("mongoose");

const aregionSchema=new mongoose.Schema({
    aregion:{
        type:String,
        require:true
    },
    category:{
        type:String
    },
    creatAt:{
        type:Date,
        default:new Date(),
      }
   
});

const aregionmodel=mongoose.model("aregion",aregionSchema);
module.exports=aregionmodel;