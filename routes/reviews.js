var express = require('express');
var router = express.Router();
var User = require('../models/user');
const Restaurant = require("../models/restaurant");

var tokenService = require('../services/auth');
var passwordService = require('../services/password');
const { json, response } = require('express');




//route to ADD a review --> this allows a logged in user add a review to a restaurant
router.post('/addReview', async(req, res, next) => {

    let myToken = req.headers.authorization;
    let currentUser = await tokenService.verifyToken(myToken);

    if (currentUser) {
        // console.log(req.body);

        let ret = await Restaurant.updateOne({
            //_id: req.body._id,
            name: req.body.name
        }, {
            $push: {
                reviews: {
                    username: currentUser.username,
                    review: req.body.review,
                    date
                }
            }
        }, );
    }

    // console.log(ret.n);
    // console.log(ret.nModified);

    res.status(200).send("Review successfully created");

});



//updating/edit a review
router.put('/editReview/:resId', async(req, res, next) => {
    Restaurant.findOneAndUpdate({ 'reviews._id': req.params.resId }, {
        '$set': {
            'reviews.$.review': req.body.review
        }
    }, function(err) { err })
    res.status(200).send("Review successfully updated");
})



//deleting a review ---- LOOKS LIKE THIS IS WORKING!!
//this route needs to be authenticated to allow a user delete their own review
router.delete('/delete/:resId/:revId', function(req, res) {
    Restaurant.updateOne({
            // this first id is the id for the restaurant 
            _id: req.params.resId //'6176f81cb156ca1dceec104d'
        }, { $pull: { 'reviews': { _id: req.params.revId } } },

        function(err) { err }
    )
    res.status(200).send('Review deleted')
})




// //route to find a review --> this should find all reviews by a single user
// router.get('/', function(req, res, next) {
//     Restaurant.find()
//         .then(response => {
//             // res.send(response)
//             console.log(response)
//             for (let i = 0; i < response.length; i++) {
//             console.log(response[i])
//                 review.find({
//                     restaurantId: response[i].id
//                 }).then(res => {
//                     console.log(res)
//                     res.json({
//                         restaurantInfo: response,
//                         reviews: res
//                     })
//                 })
//             }


//         })
//         .catch(err => {
//             res.status(500).send('Error in retrieving review')
//         })
// })


// deleting a review... OK SO THIS DELETED THE ENTIRE RESTAURANT!
// router.delete('/deletereview', async(req, res, next) => {
//     Restaurant.findOneAndRemove({ 'reviews._id': '6171210d06c7c548608f45b2' }, {
//         '$pull': {
//             'reviews.$.review': req.body.review
//         }
//     }, function(err) { err })
//     res.status(200).send("Review successfully deleted");
// })



module.exports = router;