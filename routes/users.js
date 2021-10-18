var express = require('express');
var router = express.Router();
var User = require('../models/user');

var tokenService = require('../services/auth');
var passwordService = require('../services/password');

/* GET users listing. */

//ROUTES NEEDED: 

//sign up view... is this needed if we are not using handlebars or will React take care of this?
//render the sign up page
router.get('/signup', function(req, res, next) {
    res.send('sign up page');
});


//registration/sign up ----> /signup   THIS SEEMS TO BE WORKING FINE!
router.post('/signup', async(req, res, next) => {
    try {
        let newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            city: req.body.city,
            username: req.body.username,
            password: passwordService.hashPassword(req.body.password),
            tagline: req.body.tagline
        });
        let result = await newUser.save();
        console.log(result);
        //res.status(200).send("User successfully created");
    } catch (err) {
        //if this stops working, res.json is the culprit!
        res.json({
            message: "User successfully created",
            status: 200
        })
    }
})



//login view... is this needed if we are not using handlebars or will React take care of this?
router.get('/login', function(req, res, next) {
    res.send('login page');
});

// login ----> /login THIS IS THE ONE THAT WORKS
router.post('/login', async(req, res, next) => {
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
                    token
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


//profile page ----> /myprofile
router.get('/profile', async(req, res, next) => {
    //console.log(req.headers);
    let myToken = req.headers.authorization;
    console.log(myToken);

    if (myToken) {
        let currentUser = await tokenService.verifyToken(myToken);
        //console.log(currentUser);

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




//restaurant page plan on 3? too much?? ----> /*name of restaurant */ 
//home page - just render home page ----> /home
//favourtie page ----> 
//map ---->

//add review ---->
//logout ---->
//admin ---->
//delete review ---->
//delete user ---->
//edit review ---->


module.exports = router;