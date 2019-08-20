const express  = require("express"),
	app        = express(),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp")
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//schema setup

const campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

/*Campground.create({
	name: "Granite", 
	image: "https://c1.hiqcdn.com/customcdn/500x500/blog/sites/default/files/camping-te.jpg"
}, function(err, campground){
	if(err){
		console.log(err);
	}else{
		console.log("Newly created campground:");
		console.log(campground);
	}
})*/

/*var campgrounds =[
		{name: "Salmon", image: "http://www.guntherpublications.com/core/wp-content/uploads/2018/01/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg"},
		{name: "Granite", image: "https://c1.hiqcdn.com/customcdn/500x500/blog/sites/default/files/camping-te.jpg"},
		{name: "Mountain", image: "https://cdn.pixabay.com/photo/2017/08/06/02/32/camp-2587926_960_720.jpg"}
	];*/

app.get("/", function(req, res){
	res.render("landing");
})

app.get("/campgrounds", function(req, res){
	//GET ALL CAMPGROUNDS FROM DB
	Campground.find({}, function(err, campgrounds){
		if(err) {
			console.log(err);
		}else{
			res.render("campgrounds", {campgrounds: campgrounds});
		}
	})
})

app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image}
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

app.get("/campgrounds/new", function(req, res){
	res.render("newCampground")
})
// Tell Express to listen for requests (start server)
app.listen(3000, function() { 
  console.log('YelpCamp Server has started!!!'); 
});