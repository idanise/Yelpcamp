var mongoose = require("mongoose")
var Campground = require("./models/campground")
var Comment = require("./models/comment")

var data = [
    {
        name: "Clouds Rest", 
        image: "http://farm9.staticflickr.com/8605/16573646931_22fc928bf9_o.jpg",
        description: "This is a nice place dawg,Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed dapibus magna. Nulla scelerisque, mauris eget iaculis commodo, justo turpis consectetur est, .. "
    }, 
    {
        name: "Mountain top", 
        image: "https://media.kare11.com/assets/KARE/images/437173820/437173820_750x422.png",
        description: "This is a nice place mate, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed dapibus magna. Nulla scelerisque, mauris eget iaculis commodo, justo turpis consectetur est, ..."
    },
    {
        name: "Mountain top", 
        image: "https://www.parks.ca.gov/pages/712/images/DayCamping1.jpg",
        description: "This is a nice place mate, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed dapibus magna. Nulla scelerisque, mauris eget iaculis commodo, justo turpis consectetur est, ..."
    }
]

function seedDB(){
    //Remove all campgrounds
    Campground.deleteMany({}, function(err){
        if(err){
            console.log(err)
        }
        console.log("removed background")
        //add a few campgrounds 
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("Added a campground")
                    //create a comment
                    Comment.create({
                        text: "This is a great place", 
                        author: "Dan"
                    }, function(err,  comment){
                        if(err){
                            console.log(err)
                        } else {
                            campground.comments.push(comment);
                            campground.save()
                            console.log("Created New comments")
                        }
                    })
                }
            })
        })
    })
}

module.exports = seedDB; 