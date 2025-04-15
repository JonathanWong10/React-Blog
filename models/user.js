const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    fullName: String,
    date: Date,
    address: String,
    type: String,
    token: String
});

const User = mongoose.model('User', userSchema);
module.exports = User;