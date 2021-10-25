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


//middleware
// const requireAuth = (req, res, next) => {
//     const token = req.cookies.jwt;

//     //check if the token exists
//     if (token) {
//         jwt.verify(token, 'foodiesecretkey', (err, decodedToken) => {
//             if (err) {
//                 console.log(err.message);
//                 res.redirect('/login')
//             } else {
//                 console.log(decodedToken);
//                 next();
//             }
//         })
//     } else {
//         res.redirect('/login')
//     }
// }


// const checkUser = (req, res, next) => {
//     const token = req.cookies.jwt;

//     if (token) {} else {}
// }

module.exports = tokenService;
// module.exports = requireAuth;