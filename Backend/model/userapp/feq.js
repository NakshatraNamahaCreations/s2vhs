const mongoose=require("mongoose");

const feqSchema=new mongoose.Schema({
    img:{
        type:Array
    },
    title:{
        type:String
    },
    category:{
        type:String 
    }
});

const feqmodel=mongoose.model("feq",feqSchema);
module.exports=feqmodel;