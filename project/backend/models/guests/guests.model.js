const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const guestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Method to hash password
guestSchema.methods.hashPassword = async function () {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(this.password, salt);
};

// Method to compare password
guestSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Guest', guestSchema);
