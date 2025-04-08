const guest=require('../models/guests/guests.model');
const bcrypt = require('bcryptjs');

exports.registerGuest = async (data) => {
    const {name ,email,phone,password}=data;
    const guestExists = await guest.findOne({ phone });
    if (guestExists) {
        return { status: false, message: 'Guest already exists' };
    }
    const newGuest = new guest({ name, email, phone, password });
    newGuest.password = await newGuest.hashPassword();
    await newGuest.save();
    return { status: true, message: 'Guest registered successfully' };  

}

exports.loginGuest = async ({phone, password}) => {
    const userdetails= await guest.findOne({ phone });
    if (!userdetails) {
        return { status: false, message: 'Guest not found' };
    }
    const isMatch = await userdetails.comparePassword(password);
    if (!isMatch) {
        return { status: false, message: 'Invalid password' };
    }
    return { status: true, message: 'Login successful' };
}

    
