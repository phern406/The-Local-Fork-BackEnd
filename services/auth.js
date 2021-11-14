const jwt = require('jsonwebtoken');
const User = require('../models/user');

var tokenService = {
    assignToken: function(user) {
        console.log(user);
        const token = jwt.sign({
                username: user.username,
                _id: user._id,
            },
            'foodiesecretkey', {
                expiresIn: '20h'
            }
        )
        return token;
    },
    verifyToken: function(token) {
        try {
            let decoded = jwt.verify(token, 'foodiesecretkey');
            return User.findById(decoded._id);
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}


module.exports = tokenService;
