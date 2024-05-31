const mongoose=require("mongoose");

const bannerSchema=new mongoose.Schema({
    banner:{
        type:String
    },
    subcategory:{
        type:String
    }
});

const bannermodel=mongoose.model("banner",bannerSchema);
module.exports=bannermodel;