var express  = require("express"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	bodyParser = require("body-parser"),
	LocalStrategy = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
	User = require("./models/user")

mongoose.connect("mongodb://localhost/auth_demo_app")

var app = express()
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(require("express-session")({
	secret: "Raj is the best cat in the world",
	resave: false,
	saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// ======================
// ROUTES
// ======================

app.get("/", function(req, res){
	res.render("home")
})

app.get("/secret", function(req, res){
	res.render("secret")
})

// Auth rouste

// show sign up form
app.get("/register", function(req, res) {
	res.render("register")
})

//handling user sign up
app.post("/register", function(req, res){
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render('register')
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/secret")
		})
	})
})

// Login Routes
app.get("/login", function(req, res){
	res.render("login")
})

app.post("/login", passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/login"
}), function(req, res){
})

// Tell Express to listen for requests (start server)
app.listen(3000, function() { 
  console.log('YelpCamp Server has started!!!'); 
});