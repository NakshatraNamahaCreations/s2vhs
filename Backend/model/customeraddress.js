const mongoose=require("mongoose");

const addressSchema=new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
    },
    address:{
        type:String,
    },
    landmark:{
        type:String,
    },
    otherData:{
        type:String,
    },
    platNo:{
        type:String,
    },
    saveAs:{
        type:String,
    }, 
    markerCoordinate:{
        type:Object
    }
}, {
    timestamps: true,
  });

const customerAddressmodel=mongoose.model("customeraddress",addressSchema);
module.exports=customerAddressmodel;