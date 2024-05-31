const mongoose=require("mongoose");

const bannerSchema=new mongoose.Schema({
    banner:{
        type:String
    },
    Link:{
        type:String
    },
    Height:{
        type:String
    }
});

const exbannermodel=mongoose.model("exbanner",bannerSchema);
module.exports=exbannermodel;