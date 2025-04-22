const Guest = require('../models/guests/guests.model');

exports.registerGuest = async (data) => {
    try {
        const { name, email, phone, password } = data;

        const guestExists = await Guest.findOne({ phone });
        if (guestExists) {
            return { status: false, message: 'Guest already exists' };
        }

        const newGuest = new Guest({ name, email, phone, password });
        newGuest.password = await newGuest.hashPassword();
        await newGuest.save();

        return { status: true, message: 'Guest registered successfully' };
    } catch (error) {
        console.error("Register Error:", error);
        return { status: false, message: 'Error during registration' };
    }
};

exports.loginGuest = async ({ phone, password }) => {
    try {
        const userdetails = await Guest.findOne({ phone });
        if (!userdetails) {
            return { status: false, message: 'Guest not found' };
        }

        const isMatch = await userdetails.comparePassword(password);
        if (!isMatch) {
            return { status: false, message: 'Invalid password' };
        }

        return { status: true, message: 'Login successful' };
    } catch (error) {
        console.error("Login Error:", error);
        return { status: false, message: 'Error during login' };
    }
};
