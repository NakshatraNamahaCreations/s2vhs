const mongoose=require("mongoose");

const referralCodeSchema=new mongoose.Schema({
    referralCode:{
        type:String
    },
    count:{
        type:Number,
        default:1
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId
    }
});

const referralCodemodel=mongoose.model("referralCode",referralCodeSchema);
module.exports=referralCodemodel;