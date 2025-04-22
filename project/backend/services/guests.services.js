const Guest = require('../models/guests/guests.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'yourGuestSecretKey';

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

        const token = jwt.sign(
            { id: newGuest._id, phone: newGuest.phone, email: newGuest.email },
            JWT_SECRET,
            { expiresIn: '2h' }
        );

        return { status: true, message: 'Guest registered successfully', obj: newGuest, token };
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

        const token = jwt.sign(
            { id: userdetails._id, phone: userdetails.phone, email: userdetails.email },
            JWT_SECRET,
            { expiresIn: '2h' }
        );

        return { status: true, message: 'Login successful', token };
    } catch (error) {
        console.error("Login Error:", error);
        return { status: false, message: 'Error during login' };
    }
};
