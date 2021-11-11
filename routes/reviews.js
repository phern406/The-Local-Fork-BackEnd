var express = require("express");
var router = express.Router();
var User = require("../models/user");
const Restaurant = require("../models/restaurant");
const Review = require("../models/review");
const { ObjectId } = require("mongodb");

var tokenService = require("../services/auth");
var passwordService = require("../services/password");
const { json, response } = require("express");
const { Mongoose } = require("mongoose");

//BRAND NEW ROUTES - OLDER ONES NOT REACT FRIENDLY
// FIND ALL REVIEWS WHERE USER ID IS CURRENT USERID
router.get("/review-by-restaurant-curr-user/:restaurantId", async (req, res, next) => {
  // let currentUserId = req.params.id; // todo: load user from token
  let restaurantId = req.params.restaurantId;
  //const userObjId = ObjectId(currentUserId);
  Review.find({
    // userId: userObjId,
    restaurantId: restaurantId,
  }).then((reviewData) => {
    res.json({ message: "all ok", reviewData: reviewData });
  });
});

//FIND ALL REVIEWS FOR A PARTICULAR RESTAURANT
router.get("/review/:resid", async (req, res, next) => {
    let currentResId = req.params.resid;
    console.log(currentResId)
    //let currentUserId = req.params.id;
    const userObjId = ObjectId(currentResId);
    Review.find({
        restaurantId: userObjId,
    }).then((reviewData) => {
      res.json({ message: "all ok", reviewData: reviewData });
    });
  });


//ADD review to the review database --> working
router.post("/addNewReview", async (req, res, next) => {
  try {
    let newReview = new Review({
      title: req.body.title,
      review: req.body.review,
      rating: req.body.rating,
      restaurantId: req.body.restaurantId,
      // userId:
      restaurant
    });
    let result = await newReview.save();
    console.log(result);
    res.status(200).send("Review successfully added");
  } catch (err) {
    res.json({
      message: "Review not added",
      status: 404,
    });
  }
});


//UPDATE/EDIT a review
router.put("/updateReview/:id", function (req, res) {
  let currentUserId = req.params.id;

  // before editing review, check owner of the review and compare with current user
  

  Review.findByIdAndUpdate(
    currentUserId,
    { 
      review: req.body.review,
      title: req.body.title,
      rating: req.body.rating,
     },
    
    function (err, result) {
      console.log(err, result);
    }
  );
  res.status(200).send("Review successfully updated");
});



//OLD CODE
//route to ADD a review --> this allows a logged in user add a review to a restaurant
router.post("/addReview", async (req, res, next) => {
  let myToken = req.headers.authorization;
  let currentUser = await tokenService.verifyToken(myToken);

  if (currentUser) {
    // console.log(req.body);

    let ret = await Restaurant.updateOne(
      {
        //_id: req.body._id,
        name: req.body.name,
      },
      {
        $push: {
          reviews: {
            username: currentUser.username,
            review: req.body.review,
          },
        },
      }
    );
  }

  // console.log(ret.n);
  // console.log(ret.nModified);

  res.status(200).send("Review successfully created");
});

//updating/edit a review
router.put("/editReview/:revId/:userId", async (req, res, next) => {
  Restaurant.findOneAndUpdate(
    { "reviews._id": req.params.revId },
    { "userId": req.params.userId },
    {
      $set: {
        "reviews.$.review": req.body.review,  //If statment if its true then good else error
      },
    },
    function (err) {
      err;
    }
  );
  res.status(200).send("Review successfully updated");
});

//deleting a review ---- LOOKS LIKE THIS IS WORKING!!
//this route needs to be authenticated to allow a user delete their own review
router.delete("/delete/:resId/:revId/:userId", function (req, res) {
  Restaurant.updateOne(
    { "userId": req.params.userId },
    {
      // this first id is the id for the restaurant
      _id: req.params.resId, //'6176f81cb156ca1dceec104d'
    },
    // { $pull: { reviews: { _id: req.params.revId } } },
    { $pull: { reviews: { _id: req.params.revId } } },

    function (err) {
      err;
    }
  );
  res.status(200).send("Review deleted");
});

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
