const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const staffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{10}$/, "Phone number must be exactly 10 digits"]
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be at least 6 characters"]
    },
    role: {
        type: String,
        enum: ['admin', 'receptionist', 'housekeeping', 'manager'],
        required: true
    },
    department: {
        type: String,
        required: true
    }
});

 staffSchema.methods.hashPassword=async function(){
    this.password=await bcrypt.hash(this.password,10);
    return this.password;
    }
    staffSchema.methods.comparePassword = async function (password) {
        return await bcrypt.compare(password, this.password);
    };
    


const Staff = mongoose.model('Staff', staffSchema);
module.exports = Staff;
