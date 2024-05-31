const mongoose=require("mongoose");

const templateSchema=new mongoose.Schema({
    customertype:{
        type:String
    },
    templateid:{
        type:String
    },
    smstemplate:{
        type:String
    }
})