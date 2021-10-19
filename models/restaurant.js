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
    availability: {
        type: Boolean,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    menu: {
        type: [String],
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

var Restaurant = mongoose.model('restaurant', restaurantSchema);

module.exports = Restaurant