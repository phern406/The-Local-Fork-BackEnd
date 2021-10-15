// location, hours, availability, rating, menu (breakfast/lunch/dinner)
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    hours: {
        type: Number,
        required: true
    },
    availability: {
        type: Boolean,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    menu: {
        type: String,
        required: true
    }
});

var Restaurant = mongoose.model('restaurant', userSchema);

module.exports = Restaurant