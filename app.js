var express = require('express'),
    ejs = require('ejs'),
    request = require('request'),
    app = express(),
    bodyParser = require("body-parser"),
    path = require('path'),
    mongoose = require('mongoose'),
    flash = require("connect-flash"),
    passport= require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    passportLocalMongoose = require("passport-local-mongoose"),
    Campground = require("./models/campground.js"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds"),
    ObjectId = mongoose.Types.ObjectId;

//Requiring route
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index")
    

mongoose.connect('mongodb://localhost:27017/yelp_camp_v11', {useNewUrlParser: true, useUnifiedTopology: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + "public"));
app.use(methodOverride("_method"));
app.use(flash());

//seedDB(); seed the database


//PASSPORT CONFIGURATION 
app.use(require("express-session")({
    secret: "My life is terrible now",
    resave: false, 
    saveUninitialized: false
})); 

app.use(passport.initialize()); 
app.use(passport.session()); 
passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error"); 
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes); 
app.use("/campgrounds",  campgroundRoutes); 
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(5500, function(){
    console.log('Yelpcamp server has started')
}); 