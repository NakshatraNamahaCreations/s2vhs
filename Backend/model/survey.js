const mongoose=require("mongoose");

const surveySchema=new mongoose.Schema({
    enqdatetime:{
        type:String
    },
    name:{
        type:String
    },
    contact:{
        type:String
    },
    address:{
        type:String
    },
    reference:{
        type:String
    },
    city:{
        type:String
    },
    intrestedfor:{
        type:String
    },
    executive:{
        type:String
    },
    appodatetime:{
        type:String
    },
    note:{
        type:String
    },
    reasonforcancle:{
        type:String
    },
    technician:{
        type:String
    },
    type:{
        type:String
    }

},{timestamps:true});

const surveymodel=mongoose.model("survey",surveySchema);
module.exports=surveymodel;