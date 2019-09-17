 const express  = require("express"),
	app        = express(),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose"),
	passport   = require("passport"),
	LocalStrategy = require("passport-local"),
	Campground = require("./models/campground"),
	Comment    = require("./models/comment"),
	User = require("./models/user"),
	seedDB = require("./seeds")

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true})
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))
seedDB()

// Passport configuration
app.use(require("express-session")({
	secret: "Raj is the best cat",
	resave: false,
	saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

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
			res.render("comments/new", {campground: campground})
		}else {
			console.log(err)
		}
	})
	
})

app.post("/campgrounds/:id/comments", function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(!err) {
			Comment.create(req.body.comment, function(err, comment){
				if(!err){
					campground.comments.push(comment)
					campground.save()
					res.redirect("/campgrounds/" + campground._id)
				}else {
					console.log(err)
				}
			})
		}else {
			console.log(err);
			res.redirect("/campgrounds")
		}
	})
})

//===========
//AUTH ROUTES
//===========
app.get("/register", function(req, res){
	res.render("register")
})

app.post("/register", function(req, res){
	var newUser = new User({username: req.body.username})
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err)
			return res.render("register")
		}

		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds")
		})
	})
})

app.get("/login", function(req, res){
	res.render("login")
})

app.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}), function(req, res){
})

// Tell Express to listen for requests (start server)
app.listen(3000, function() { 
  console.log('YelpCamp Server has started!!!'); 
});