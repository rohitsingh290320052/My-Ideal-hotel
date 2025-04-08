const mongoose = require('mongoose');
const roomSchmea= new mongoose.Schema({
    photos:{
        type:[String],
        required:true
    },
    size:{
        type:Number
    },
    capacity:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
    
    },
    amenities:{
        type:[String],
        required:true
    },
    BedType:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'available'
    },
    hotelName:{
        type:String,
        required:true
    },
})
const room=mongoose.model('room',roomSchmea);
module.exports=room;