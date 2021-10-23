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
        minlength: [6, 'Minimum password length is 6 characters']
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

//fire a function after doc saved to db
// userSchema.post('save', function (doc, next) {


//     //next();
// });


var User = mongoose.model('user', userSchema);

module.exports = User

// export default User