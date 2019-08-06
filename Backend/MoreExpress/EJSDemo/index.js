var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("home");
});

app.get("/fellinlovewith/:thing", function(req, res){
	var thing = req.params.thing;
	res.render("love", {thingVar: thing});
})

app.get("/posts", function(req, res){
	var posts = [
		{title: "Great Book 1", author: "Susy"},
		{title: "Not so Great book 2", author: "Me"},
		{title: "Ok Book 3", author: "You"},
	];

	res.render("posts", {posts: posts});
})

app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});