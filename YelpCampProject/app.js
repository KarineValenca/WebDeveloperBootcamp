const express  = require("express"),
	app        = express(),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true})
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//schema setup


const campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

/*Campground.create({
	name: "Granite", 
	image: "https://c1.hiqcdn.com/customcdn/500x500/blog/sites/default/files/camping-te.jpg",
	description: "Granite camp. Very beautiful!"
}, function(err, campground){
	if(err){
		console.log(err);
	}else{
		console.log("Newly created campground:");
		console.log(campground);
	}
})*/

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
			res.render("index", {campgrounds: campgrounds});
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
	res.render("new")
})

// SHOW
app.get("/campgrounds/:id", function(req, res){
	//find campground with id
	Campground.findById(req.params.id, function(err, campground){
		if(err) {
			console.log(err);
		}else {
			//render show page
			res.render("show", {campground: campground});
		}
	});

})

// Tell Express to listen for requests (start server)
app.listen(3000, function() { 
  console.log('YelpCamp Server has started!!!'); 
});