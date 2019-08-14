const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds =[
		{name: "Salmon", image: "http://www.guntherpublications.com/core/wp-content/uploads/2018/01/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg"},
		{name: "Granite", image: "https://c1.hiqcdn.com/customcdn/500x500/blog/sites/default/files/camping-te.jpg"},
		{name: "Mountain", image: "https://cdn.pixabay.com/photo/2017/08/06/02/32/camp-2587926_960_720.jpg"}
	];

app.get("/", function(req, res){
	res.render("landing");
})

app.get("/campgrounds", function(req, res){
	res.render("campgrounds", {campgrounds: campgrounds});
})

app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image}
	campgrounds.push(newCampground);

	res.redirect("/campgrounds")
})

app.get("/campgrounds/new", function(req, res){
	res.render("newCampground")
})
// Tell Express to listen for requests (start server)
app.listen(3000, function() { 
  console.log('YelpCamp Server has started!!!'); 
});