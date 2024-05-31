const mongoose=require("mongoose");

const newShema=new mongoose.Schema({
    category:{
        type:String
    },
    region:{
        type:String
    },
    material:{
        type:String
    },
    benefits:{
        type:String
    },
    desc:{
        type:String
    },
    rate:{
        type:String
    },
    seqno:{
        type:String
    },
    termsgroup:{
        type:String
    },
    terms:{
        type:String
    },
    creatAt:{
        type:Date,
        default:new Date(),
      }

});

const newqtmodel=mongoose.model("newqt",newShema);
module.exports=newqtmodel;