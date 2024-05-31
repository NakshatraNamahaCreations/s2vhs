const mongoose=require("mongoose");

const qfSchema=new mongoose.Schema({
    category:{
        type:String,
       
    },
    region:{
        type:String,
    },
   
}, {
    timestamps: true,
  });

const qfmodel=mongoose.model("quotationformat",qfSchema);
module.exports=qfmodel;