const Guest = require('../models/guests/guests.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'yourGuestSecretKey';

function isValidPhone(phone) {
  return /^\d{10}$/.test(phone);
}

function isValidPassword(password) {
  // At least 6 characters, at least one number and one letter
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

exports.registerGuest = async (data) => {
  const { name, email, phone, password } = data;

  // Validations
  if (!isValidPhone(phone)) {
    return { status: false, message: 'Phone number must be 10 digits' };
  }

  if (!isValidPassword(password)) {
    return {
      status: false,
      message: 'Password must be at least 6 characters long and contain both letters and numbers',
    };
  }

  if (!isValidEmail(email)) {
    return { status: false, message: 'Invalid email format' };
  }

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

  return {
    status: true,
    message: 'Guest registered successfully',
    token,
    obj: {
      id: newGuest._id,
      name,
      email,
      phone,
    },
  };
};

exports.loginGuest = async ({ phone, password }) => {
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

  return {
    status: true,
    message: 'Login successful',
    token,
  };
};
