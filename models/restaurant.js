// location, hours, availability, rating, menu (breakfast/lunch/dinner)
var mongoose = require('mongoose');

var restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    hours: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    //call the entire menu be in one array with values for breakfast, lunch and dinner?
    breakfast: {
        type: String,
        required: false
    },
    lunch: {
        breakfast: String,
        required: false
    },
    dinner: {
        breakfast: String,
        required: false
    },
    deleted: {
        type: Boolean,
        default: false
    },
    
    //does the review need to be in a separate model of its own?
    //how do i connect the review given by a user to the user's id under models.user?
    // reviews: [{
    //     username: String,
    //     review: String,
    //     required: false
    // }]
});

var Restaurant = mongoose.model('restaurant', restaurantSchema);

module.exports = Restaurant