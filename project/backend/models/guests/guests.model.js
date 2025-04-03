const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const guestSchema=new mongoose.Schema({
    name:{
       required:true,
       type:String,
       trim:true,
       lowercase:true, 

    },
    email:{
        required:true,
        type:String,
    },
    phone:{
        required:true,
        type:Number,
        unique:true,
        minlength:[10,"Phone number must be 10 digits"],
        maxlength:[10,"Phone number must be 10 digits"],
    },
    password:{
        required:true,
        type:String,
        minlength:[6,"Password must be at least 6 characters"],
    }
})
  guestSchema.methods.hashPassword=async function(){
    this.password=await bcrypt.hash(this.password,10);
    return this.password;
    }
    guestSchema.methods.comparePassword=async function(password){
        return await bcrypt.compare(password,this.password);
    }

const Guest =mongoose.model('Guest',guestSchema);
module.exports=Guest;