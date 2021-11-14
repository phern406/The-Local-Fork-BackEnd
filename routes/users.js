var express = require('express');
var router = express.Router();
var User = require('../models/user');
const Restaurant = require('../models/restaurant');
const Review = require('../models/review');

var tokenService = require('../services/auth');
var passwordService = require('../services/password');



//REGISTER to new user
router.post('/signup', async(req, res, next) => {
    try {
        let newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            city: req.body.city,
            username: req.body.username,
            password: passwordService.hashPassword(req.body.password),
            tagline: req.body.tagline,
            delete: req.body.delete,
            admin: req.body.admin

        });
        let result = await newUser.save();
        console.log(result);
    } catch (err) {
        res.json({
            message: "User successfully created",
            status: 200
        })
    }
})

//LOGIN to an already existing account
router.post('/login', async(req, res, next) => {
    console.log(req.body)
    User.findOne({ username: req.body.username }, function(err, user) {
        if (err) {
            console.log(err)
            res.json({
                message: "Error accessing database",
                status: 500,
            })
        }
        if (user) {
            let passwordMatch = passwordService.comparePasswords(req.body.password, user.password);
            if (passwordMatch) {
                let token = tokenService.assignToken(user);
                res.json({
                    message: "Login was successful",
                    status: 200,
                    token,
                    user
                })
            } else {
                console.log("Wrong password");
                res.json({
                    message: "Wrong password",
                    status: 403,
                })
            }
        } else {
            res.json({
                message: "Wrong username",
                status: 403,
            })
        }
    })
})

//PROFILE page
router.get('/profile', async(req, res, next) => {
    let myToken = req.headers.authorization;

    if (myToken) {
        let currentUser = await tokenService.verifyToken(myToken);
        if (currentUser) {
            let responseUser = {
                firstname: currentUser.firstname,
                lastname: currentUser.lastname,
                city: currentUser.city,
                tagline: currentUser.tagline,
                username: currentUser.username
            }
            res.json({
                message: "User profile information loaded successfully",
                status: 200,
                user: responseUser
            })
        } else {
            res.json({
                message: "Invalid or expired token",
                status: 403,
            })
        }
    } else {
        res.json({
            message: "No token received",
            status: 403,
        })
    }
})

//LOGOUT
router.get('/logout', async(req, res, next) => {
    res.cookie('jwt', '');
    res.json({ status: "logged out"});
    res.redirect('/login');
})


module.exports = router;