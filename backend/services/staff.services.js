const Staff = require('../models/staff.model');
const bcrypt = require('bcryptjs');

exports.registerStaff = async (data) => {
    const { name, email, phone, password, role, department } = data;

    const staffExists = await Staff.findOne({ email });
    if (staffExists) return { status: false, message: 'Staff member already exists' };

    const hashedPassword = await bcrypt.hash(password, 10); // hash password
    const newStaff = new Staff({ name, email, phone, password: hashedPassword, role, department });

    await newStaff.save();

    return { status: true, message: 'Staff registered successfully', data: newStaff };
};


exports.loginStaff = async ({email, password}) => {
    const userdetails= await Staff.findOne({ email});
    if (!userdetails) {
        return { status: false, message: 'Staff not found' };
    }
    const isMatch = await userdetails.comparePassword(password);
    if (!isMatch) {
        return { status: false, message: 'Invalid password' };
    }
    return { status: true, message: 'Staff Login successful' };
}
