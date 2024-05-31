const mongoose=require("mongoose");

const webannerSchema=new mongoose.Schema({
    banner:{
        type:String
    }
});

const webBannermodel=mongoose.model("websitebanner",webannerSchema);
module.exports=webBannermodel;