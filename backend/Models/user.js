const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'provide your Full Name']
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: [true, 'Provide a valid phone number']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    orgemail: {
        type: String,
        required: true,
        default: 'Input organizational email here'
    },
    whatsapp: {
        type: String,
        required: true,
        default: 'Whatsapp contact(Optional)'
    },
    bio: {
        type: String,
        required: true,
        default: 'Write a short story about yourself'
    },
    password: {
        type: String,
        required: true,
    },
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);
