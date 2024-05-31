const mongoose=require("mongoose");

const slotsSchema=new mongoose.Schema({
    startTime:{
        type:String
    },
    endTime:{
        type:String
    }
});

const slotsmodel=mongoose.model("slots",slotsSchema);
module.exports=slotsmodel;