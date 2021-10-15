var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */

//ROUTES NEEDED: 
//registration/sign up ----> /signup
router.post('/signup', async(req, res, next) => {
    try {
        let newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            city: req.body.city,
            username: req.body.username,
            password: req.body.password,
            tagline: req.body.tagline
                //admin ---->
        })
    } catch (err) {}
})

//login ----> /login
router.post('/login', async(req, res, next) => {})

//profile page ----> /myprofile
router.post('/myprofile', async(req, res, next) => {})

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