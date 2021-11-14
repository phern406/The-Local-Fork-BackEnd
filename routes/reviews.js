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


//FIND review by users for restaurants.
router.get('/singlereview/:restId', async (req, res, next)=>{
  let restId = ObjectId(req.params.restId);
  let myToken = req.headers.authorization;
  let currentUser = await tokenService.verifyToken(myToken);

  if (myToken){
    data = await Review.findOne({
      restaurantId: restId,
      userId: ObjectId(currentUser.id)
    }).exec();
    if (data) {
      res.json({ message: "Review found", reviewData: data });
      console.log(data)
    } else {
      res.json({ message: "User did not review this restaurant" });
    }
  } else {
    res.status(401).send("User not found")
  }
 });


// FIND ALL reviews where userId === current userId. This is used on the profile page
router.get("/myreview", async (req, res, next) => {
  let myToken = req.headers.authorization;
  let currentUser = await tokenService.verifyToken(myToken);
  const userObjId = ObjectId(currentUser._id);
  Review.find({
    userId: userObjId,
  }).then((reviewData) => {
    res.json({ message: "All reviews displayed", reviewData: reviewData });
  });
});

//FIND ALL reviews for a particular restaurant
router.get("/review/:resid", async (req, res, next) => {
  let currentResId = req.params.resid;
  console.log(currentResId);
  //let currentUserId = req.params.id;
  const userObjId = ObjectId(currentResId);
  Review.find({
    restaurantId: userObjId,
  }).then((reviewData) => {
    res.json({ message: "all ok", reviewData: reviewData });
  });
});

//ADD review to the review database --> with authorisation
router.post("/addNewReview", async (req, res, next) => {
  let myToken = req.headers.authorization;
  let currentUser = await tokenService.verifyToken(myToken);
  let currentResId = ObjectId(req.body.restaurantId);
  if (currentUser){
      let newReview = new Review({
        restaurantName: req.body.restaurantName,
        name: currentUser.firstname,
        review: req.body.review,
        userId: ObjectId(currentUser._id),
        restaurantId: currentResId,
      });
      let result = await newReview.save();
      console.log(result);
      res.status(200).send("Review successfully added");
    } else {
      res.json({
        message: "User not found, must be a logged in user",
        status: 401,
      });
  }
  }
);

//UPDATE/EDIT a review ---- with authorisation
router.put("/updateReview/:id", async (req, res) => {
  let myToken = req.headers.authorization;
  let currentUser = await tokenService.verifyToken(myToken);
  let currentReviewId = ObjectId(req.params.id);

  if (myToken) {
      data = await Review.findOneAndUpdate(
        {
          _id: currentReviewId,
          userId: ObjectId(currentUser._id),
        },
        {
          review: req.body.review,
          
        }, {new: true}
      ).exec();

      //console.log(data);

      if (data) {
      res.json({
            message: "Review successfully updated",
            reviewData: data,
          });
        } else {
          res.status(401).send("You are not allowed to update this review");
        }
  } else {
    res.status(401).send("You are not allowed to update this review");
  }
});

//DELETE a review --> with authorisation
router.delete("/delete/:revId", async (req, res)=>{
  let myToken = req.headers.authorization;
  let currentUser = await tokenService.verifyToken(myToken);
  let revId = ObjectId(req.params.revId)

  if (myToken){
    data = await Review.findOneAndDelete(
      {
        _id: revId,
        userId: ObjectId(currentUser._id) 
      }
    ).exec();

    if (data) {
      res.json({
            message: "Review successfully deleted",
            reviewData: data,
          });
        } else {
          res.status(401).send("You are not allowed to delete this review");
        }
  } else {
    res.status(401).send("You are not allowed to delete this review");
  }
});




//OLD CODE
//route to ADD a review --> this allows a logged in user add a review to a restaurant
router.post("/addReview", async (req, res, next) => {
  let myToken = req.headers.authorization;
  let currentUser = await tokenService.verifyToken(myToken);

  if (currentUser) {

    let ret = await Restaurant.updateOne(
      {
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
  res.status(200).send("Review successfully created");
});

//updating/edit a review
router.put("/editReview/:revId/:userId", async (req, res, next) => {
  Restaurant.findOneAndUpdate(
    { "reviews._id": req.params.revId },
    { "userId": req.params.userId },
    {
      $set: {
        "reviews.$.review": req.body.review,
      },
    },
    function (err) {
      err;
    }
  );
  res.status(200).send("Review successfully updated");
});

//deleting a review ---- LOOKS LIKE THIS IS WORKING!!
router.delete("/delete/:resId/:revId/:userId", function (req, res) {
  Restaurant.updateOne(
    { "userId": req.params.userId },
    {
      // this first id is the id for the restaurant
      _id: req.params.resId,
    },
    { $pull: { reviews: { _id: req.params.revId } } },

    function (err) {
      err;
    }
  );
  res.status(200).send("Review deleted");
});

module.exports = router;
