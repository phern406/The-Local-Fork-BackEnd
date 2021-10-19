var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurant');



router.get('/:resources', function(req, res, next) {
    let restName = req.params.resources
    console.log(restName)
    Restaurant.findOne({
            name: restName
    }) 
    .then(restaurant => {
        res.json({
            status: 200,
            message: "Success",
            data: restaurant
        })
    })
});

module.exports = router;