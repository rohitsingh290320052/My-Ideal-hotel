const Staff = require('../models/staff.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'yourSecretKey';

exports.registerStaff = async (data) => {
    const { name, email, phone, password, role } = data;

    // Validation
    if (!name || name.length < 3) {
        return { status: false, message: 'Name must be at least 3 characters' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return { status: false, message: 'Invalid email format' };
    }
    const phoneRegex = /^\d{10}$/;
    if (!phone || !phoneRegex.test(phone)) {
        return { status: false, message: 'Phone must be 10 digits' };
    }
    if (!password || password.length < 6) {
        return { status: false, message: 'Password must be at least 6 characters' };
    }
    if (!role) {
        return { status: false, message: 'Role is required' };
    }

    const staffExists = await Staff.findOne({ email });
    if (staffExists) return { status: false, message: 'Staff member already exists' };

    const hashedPassword = await bcrypt.hash(password, 10);
    const newStaff = new Staff({ name, email, phone, password: hashedPassword, role });

    await newStaff.save();

    const token = jwt.sign(
        { id: newStaff._id, email: newStaff.email, role: newStaff.role },
        JWT_SECRET,
        { expiresIn: '2h' }
    );

    return {
        status: true,
        message: 'Staff registered successfully',
        obj: {
            id: newStaff._id,
            name: newStaff.name,
            email: newStaff.email,
            phone: newStaff.phone,
            role: newStaff.role,     
            token
        }
    }
};

exports.loginStaff = async ({ email, password }) => {
    const userdetails = await Staff.findOne({ email });
    if (!userdetails) {
        return { status: false, message: 'Staff not found' };
    }

    const isMatch = await userdetails.comparePassword(password);
    if (!isMatch) {
        return { status: false, message: 'Invalid password' };
    }

    const token = jwt.sign(
        { id: userdetails._id, email: userdetails.email, role: userdetails.role },
        JWT_SECRET,
        { expiresIn: '2h' }
    );

    return {
        status: true,
        message: 'Staff login successful',
        token
    };
};
