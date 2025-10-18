const mongoose=require('mongoose');
const {Schema}=mongoose;

//Name
// Type
// Model
// Description

const deviceSchema=new mongoose.Schema({
name:{
    type:mongoose.Schema.Types.Mixed,
    required:true
},
type:{
    type:mongoose.Schema.Types.Mixed,
    required:false
},
model:{
    type:mongoose.Schema.Types.Mixed,
    required:false
},
description:{
    type:mongoose.Schema.Types.Mixed,
    required:false
},
location:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Location',
}],
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
},
status:{
    type:String,
    enum:['active','inactive'],
    default:'active'
},
createdAt:{
    type:Date,
    default:Date.now
},
updatedAt:{
    type:Date,
    default:Date.now
}
})

const Device=mongoose.model('Device',deviceSchema);
module.exports=Device;