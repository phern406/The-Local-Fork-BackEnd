var express = require('express');
var router = express.Router();
var Restaurant = require('../models/restaurant');



router.get('/res1', async(req, res, next) => {
    console.log("are you working?")
});

module.exports = router;