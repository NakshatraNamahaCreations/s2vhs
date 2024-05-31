const mongoose=require("mongoose");

const homepagetitleSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
   
}, {
    timestamps: true,
  });

const homepagetitlemodel=mongoose.model("homepagetitle",homepagetitleSchema);
module.exports=homepagetitlemodel;