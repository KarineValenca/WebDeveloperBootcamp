var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var friends = ["Rachel", "Ross", "Chandler"];

app.get("/", function(req, res) {
	res.render("home");
});

app.get("/friends", function(req, res){
	res.render("friends", {friends: friends});
});

app.post("/addFriend", function(req, res){
	var friend = req.body.newFriend;
	friends.push(friend);
	res.redirect("friends");
});

app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});