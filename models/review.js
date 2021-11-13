var mongoose = require("mongoose");

var reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  review: {
    type: String,
    required: true
  },
  userId: {
    type: Object,
    required: false
  },
  restaurantId: {
    type: Object,
    required: false 
  },
  restaurantName: {
    type: String,
    required: true 
  },
  // rating: {
  //   type: Number,
  //   required: true
  // },
  // createdAt: { type: timestamp}
  
  deleted: {
    type: Boolean,
    default: false
  }
});

var Review = mongoose.model("review", reviewSchema);

module.exports = Review;
