const mongoose=require("mongoose");

const spotlightbannerSchema=new mongoose.Schema({
    banner:{
        type:String
    },
    category:{
        type:String
    }
});

const spotlightbannermodel=mongoose.model("spotlightbanner",spotlightbannerSchema);
module.exports=spotlightbannermodel;