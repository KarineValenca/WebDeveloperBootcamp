const express  = require("express"),
	app        = express(),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose");
	Campground = require("./models/campground")
	seedDB = require("./seeds")

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true})
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

app.get("/", function(req, res){
	res.render("landing");
})

// INDEX
app.get("/campgrounds", function(req, res){
	//GET ALL CAMPGROUNDS FROM DB
	Campground.find({}, function(err, campgrounds){
		if(err) {
			console.log(err);
		}else{
			res.render("campgrounds/index", {campgrounds: campgrounds});
		}
	})
})

// CREATE
app.post("/campgrounds", function(req, res){
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

// NEW
app.get("/campgrounds/new", function(req, res){
	res.render("campgrounds/new")
})

// SHOW
app.get("/campgrounds/:id", function(req, res){
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

//==============================

// Comment new

app.get("/campgrounds/:id/comments/new",function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(!err){
			res.render("comments/new", {campground: campground});
		}else {
			console.log(err);
		}
	})
	
})


// Tell Express to listen for requests (start server)
app.listen(3000, function() { 
  console.log('YelpCamp Server has started!!!'); 
});