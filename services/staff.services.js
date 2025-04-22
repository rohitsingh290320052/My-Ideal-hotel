const Staff = require('../models/staff.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'yourSecretKey'; // You should use .env file

exports.registerStaff = async (data) => {
    const { name, email, phone, password, role, department } = data;

    const staffExists = await Staff.findOne({ email });
    if (staffExists) return { status: false, message: 'Staff member already exists' };

    const hashedPassword = await bcrypt.hash(password, 10);
    const newStaff = new Staff({ name, email, phone, password: hashedPassword, role, department });

    await newStaff.save();
  
    const token = jwt.sign({ id: newStaff._id, email: newStaff.email, role: newStaff.role }, JWT_SECRET, { expiresIn: '2h' });
    const obj={
        "token_id":token,
        "name":name
    }

    return { status: true, message: 'Staff registereddd successfully', obj };
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

    // Create JWT token
    const token = jwt.sign({ id: userdetails._id, email: userdetails.email, role: userdetails.role }, JWT_SECRET, { expiresIn: '2h' });

    return { status: true, message: 'Staff Login successful', token };
};
