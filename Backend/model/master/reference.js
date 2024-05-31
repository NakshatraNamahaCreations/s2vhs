const mongoose=require("mongoose");

const referenceSchema=new mongoose.Schema({
    referencetype:{
        type:String,
        require:true
    },
   
}, {
    timestamps: true,
  });

const referencemodel=mongoose.model("masterreference",referenceSchema);
module.exports=referencemodel;