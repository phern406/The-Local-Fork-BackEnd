var mongoose = require("mongoose");

var reviewSchema = new mongoose.Schema({
  title: {
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
  rating: {
    type: Number,
    required: true
  },
  deleted: {
    type: Boolean,
    default: false
  }
});

var Review = mongoose.model("review", reviewSchema);

module.exports = Review;
