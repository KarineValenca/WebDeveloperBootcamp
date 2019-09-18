var express = require("express")
var router = express.Router()
var Campground = require("../models/campground")

router.get("/", function(req, res){
	//GET ALL CAMPGROUNDS FROM DB
	Campground.find({}, function(err, campgrounds){
		if(err) {
			console.log(err);
		}else{
			res.render("campgrounds/index", {campgrounds: campgrounds});
		}
	})
})

router.post("/", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newCampground = {name: name, image: image, description: description}
	//Create a new campground and save to DB
	Campground.create(newCampground, function(err, campground){
		if(err){
			console.log(err);
		}else {
			console.log("New campground added")
			res.redirect("/campgrounds");
		}
	})
})

router.get("/new", function(req, res){
	res.render("campgrounds/new")
})

router.get("/:id", function(req, res){
	//find campground with id
	Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
		if(err) {
			console.log(err);
		}else {
			//render show page
			res.render("campgrounds/show", {campground: campground});
		}
	});

})

module.exports = router