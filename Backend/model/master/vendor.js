const mongoose=require("mongoose");

const vendorSchema=new mongoose.Schema({
    vendorname:{
        type:String,
        require:true
    },
    contactperson:{
        type:String,
        require:true
    },
    vendornumber:{
        type:String,
        require:true
    },
    maincontact:{
        type:String,
        require:true
    },
    alternateno:{
        type:String,
        require:true
    },
    email:{
        type:String
    },
    gstid:{
        type:String
    },
    address:{
        type:String,
    },
    city:{
        type:String,
    },
    pincode:{
        type:String
    },
    LNF:{
        type:String
    },
    color:{
        type:String,
        require:true
    },
    instructions:{
        type:String,
        require:true
    }


}, {
    timestamps: true,
  });

const vendormodel=mongoose.model("vendors",vendorSchema);
module.exports=vendormodel;