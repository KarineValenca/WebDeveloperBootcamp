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

app.use(require("express-session")({
	secret: "Raj is the best cat in the world",
	resave: false,
	saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.get("/", function(req, res){
	res.render("home")
})

app.get("/secret", function(req, res){
	res.render("secret")
})
// Tell Express to listen for requests (start server)
app.listen(3000, function() { 
  console.log('YelpCamp Server has started!!!'); 
});