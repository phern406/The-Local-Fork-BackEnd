var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurant');



//find all restaurants 
router.get('/restaurants', function(req, res){
    Restaurant.find({
        //deleted: false
    }, function(err, result){
        if (err){
            console.log(err);
        } else {
            res.json(result),
            console.log(result)
        }
    });
});

//to find a restaurant by name
router.get('/:resources', function(req, res, next) {
    let restName = req.params.resources
    Restaurant.findOne({
            name: restName
        })
        .then(restaurant => {
            console.log(restaurant);
            res.json({
                status: 200,
                message: "Success",
                data: restaurant
            })
        })
});

//to add a restaurant
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

//route for SEARCH 


//potentially to search for a restaurant using specific filters
// export default class Restaurant {
//     static async getRestaurant({
//         filters = null,
//         page = 0,
//         restaurantsPerPage = 20,

//     } = {}) {
//         let query
//         if (filters) {
//             if ("name" in filters) {
//                 query = { $text: { $search: filters["name"] } }
//             } else if ('location' in filters) {
//                 query = { $text: { $search: filters["location"] } }
//             }
//         }
//     }
// }

module.exports = router;