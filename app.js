var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var restaurantRouter = require('./routes/restaurant');
var reviewRouter = require('./routes/reviews')

//APP IS RUNNING AT PORT 5000
var app = express();

//MONGO CONNECTION
var connectionString = "mongodb+srv://TheLocalFork:TheLocalFork_1@cluster0.7os4i.mongodb.net/Users?retryWrites=true&w=majority";
mongoose.connect(connectionString, {
    useNewUrlParser: true,
})

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function() {
    console.log("Database connected");
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/restaurant', restaurantRouter);
app.use('/review', reviewRouter);

module.exports = app;