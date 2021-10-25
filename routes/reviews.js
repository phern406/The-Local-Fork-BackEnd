var express = require('express');
var router = express.Router();
var User = require('../models/user');
const Restaurant = require("../models/restaurant");

var tokenService = require('../services/auth');
var passwordService = require('../services/password');
const { json, response } = require('express');




//route to ADD a review --> this allows users add a review to a restaurant
router.post('/addReview', async(req, res, next) => {

    let myToken = req.headers.authorization;
    //console.log(myToken);
    let currentUser = await tokenService.verifyToken(myToken);
    //console.log(currentUser);

    if (currentUser) {
        console.log(req.body);

        let ret = await Restaurant.updateOne({
            _id: req.body._id,
            //name: 'Res7'
        }, {
            $push: {
                reviews: {
                    username: currentUser.username,
                    review: req.body.review
                }
            }
        }, );
    }

    console.log(ret.n);
    console.log(ret.nModified);

    res.status(200).send("Review successfully created");

});



//updating a review
router.put('/editReview', async(req, res, next) => {
    Restaurant.findOneAndUpdate({ 'reviews._id': '6171210d06c7c548608f45b2' }, {
        '$set': {
            'reviews.$.review': 'updated again'
        }
    }, function(err) { err })
    res.status(200).send("Review successfully updated");
})


// deleting a review
router.delete('/:id', function(req, res) {
    let deleteUser = req.params.id
    Restaurant.findOne({
            _id: deleteUser
        })
        .then(Restaurant.review, {
            delete: true
        });
});



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



// //route to DELETE a review --> this should allow a user delete their own review
// router.delete('/:id', async(req, res, next) => {
//     const id = req.body.id;

//     Restaurant.findByIdAndDelete(id)
//         .then(data => {
//             if (!data) {
//                 res.status(404).send({ message: `Cannot delete with ${id}` })
//             } else {
//                 res.send({ message: 'User deleted successfully' })
//             }
//         })
//         .catch(err => {
//             res.status(500).send({ message: 'Could not delete user with id ' + id })
//         })
// })


module.exports = router;