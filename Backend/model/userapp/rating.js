const mongoose=require("mongoose");

const ratingSchema=new mongoose.Schema({
    rating:{
        type:Number
    },
    review:{
        type:String
    },
    ServiceName:{
        type:String
    },
    serviceID:{
        type:mongoose.Schema.Types.ObjectId
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId
    },
    customerName:{
        type:String
    }
   
},

{
    timestamps: true,
  });

const ratingModel=mongoose.model("rating",ratingSchema);
module.exports=ratingModel;