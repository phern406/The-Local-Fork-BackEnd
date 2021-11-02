const { query } = require("express");
var express = require("express");
var router = express.Router();
var Restaurant = require("../models/restaurant");

//find all restaurants
router.get("/", function (req, res) {
  Restaurant.find(
    {},
    {
      _id: 0,
      name: 1,
      location: 1,
      hours: 1,
      rating: 1,
      reviews: 10,
    },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.json(result), console.log(result);
      }
    }
  );
});

//to add a restaurant
router.post("/addRes", async (req, res, next) => {
  try {
    let newRes = new Restaurant({
      name: req.body.name,
      location: req.body.location,
      hours: req.body.hours,
      availability: req.body.availability,
      rating: req.body.rating,
      menu: req.body.menu,
      deleted: req.body.deleted,
    });
    let result = await newRes.save();
    console.log(result);
    res.status(200).send("User successfully created");
  } catch (err) {
    res.json({
      message: "Restaurant not added",
      status: 404,
    });
  }
});

//update a restaurant
router.put("/updateRes", function (req, res) {
  Restaurant.findOneAndUpdate(
    { name: "Res7" },
    { location: "Another location" },
    function (err, result) {
      console.log(err, result);
    }
  );

  res.status(200).send("User successfully created");
});

//route for SEARCH ===> THIS WORKS
router.get("/search", function (req, res) {
  Restaurant.find(
    {
      $or: [
        {
          name: { $regex: req.query.search, $options: "i" },
        },
        {
          location: { $regex: req.query.search, $options: "i" },
        },
      ],
    },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        console.log(result), res.json(result);
      }
    }
  );
});

// //route for SEARCH
// router.get("/search", function (req, res) {
//     let query
//   Restaurant.find(
//     {},
//     {
//       if(filters) {
//         if ("name" in filters) {
//           query = { $text: { $search: filters["name"] } };
//         } else if ("location" in filters) {
//           query = { $text: { $search: filters["location"] } };
//         }
//       },
//     },
//     function (err, query) {
//     //   if (err) {
//     //     console.log(err);
//     //   } else {
//     //     res.json(query);
//     //     console.log(query);
//     //  }
//     }
//   );
// });

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

//to find a restaurant by name
router.get("/:resources", function (req, res, next) {
  console.log("test");
  let restName = req.params.resources;
  Restaurant.findOne({
    name: restName,
  }).then((restaurant) => {
    console.log(restaurant);
    res.json({
      status: 200,
      message: "Success",
      data: restaurant,
    });
  });
});

module.exports = router;
