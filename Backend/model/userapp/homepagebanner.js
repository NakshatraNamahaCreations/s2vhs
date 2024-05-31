const mongoose=require("mongoose");

const homebannerSchema=new mongoose.Schema({
    banner:{
        type:String
    },
    category:{
        type:String
    }
});

const homebannermodel=mongoose.model("homebanner",homebannerSchema);
module.exports=homebannermodel;