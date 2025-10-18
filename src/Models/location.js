const mongoose=require("mongoose");


const locationSchema=new mongoose.Schema({
    deviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device'
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
        latitude:{
        type:Number,
        required:true
    },
    longitude:{
        type:Number,
        required:true
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
});

const Location=mongoose.model("Location",locationSchema);
module.exports=Location;