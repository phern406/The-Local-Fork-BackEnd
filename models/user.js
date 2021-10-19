// import { Schema, model } from 'mongoose';
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        //lowercase: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    city: {
        type: String,
    },
    tagline: {
        type: String,
    },
    deleted: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean,
        default: false
    }
});

var User = mongoose.model('user', userSchema);

module.exports = User

// export default User