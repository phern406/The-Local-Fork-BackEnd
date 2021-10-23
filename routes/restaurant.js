var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurant');



router.get('/:resources', function(req, res, next) {
    let restName = req.params.resources
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

router.post('/addRes', async(req, res, next) => {
    try {
        let newRes = new Restaurant({
            name: req.body.name,
            location: req.body.location,
            hours: req.body.hours,
            availability: req.body.availability,
            rating: req.body.rating,
            menu: req.body.menu,
            deleted: req.body.deleted
        });
        let result = await newRes.save();
        console.log(result);
        res.status(200).send("User successfully created");
    } catch (err) {
        res.json({
            message: "Restaurant not added",
            status: 404
        })
    }
})


//update a restaurant
router.put('/updateRes', function(req, res) {
    Restaurant.findOneAndUpdate({ name: "Res7" }, { location: "Another location" },
        function(err, result) { console.log(err, result) }
    )

    res.status(200).send("User successfully created");
});


// Restaurant.update({'items.id': 2}, {'$set': {
//     'items.$.name': 'updated item2',
//     'items.$.value': 'two updated'
// }}, function(err) { }


module.exports = router;