const express    = require("express"),
	  app        = express(),
	  bodyParser = require("body-parser"),
	  mongoose   = require("mongoose");


// APP CONFIG
mongoose.connect("mongodb://localhost:27017/blog_app", {useNewUrlParser: true})
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


// MONGOOSE/MODEL CONFIG
const blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// RESTFUL ROUTES
app.get("/", function(req, res){
	res.redirect("/blogs");
})

app.get("/blogs", function(req, res){
	//List all blogs
	Blog.find({}, function(err, blogs){
		if(!err) {
			res.render("index", {blogs: blogs});
		}else {
			console.log("ERROR!");
		}
	})
});

// NEW ROUTE
app.get("/blogs/new", function(req, res){
	res.render("new");
})

// CREATE ROUTE
app.post("/blogs", function(req, res){
	Blog.create(req.body.blog, function(err, blog){
		if(!err) {
			res.redirect("/blogs")
		}else{
			res.render("new")
		}
	})
})

// SHOW ROUTE
app.get("/blogs/:id", function(req, res){
	Blog.findById(req.params.id, function(err, blog){
		if(!err) {
			res.render("show", {blog: blog})
		}else {
			res.redirect("blogs");
		}
	})
})

// Tell Express to listen for requests (start server)
app.listen(3000, function() { 
  console.log('Blog Server has started!!!'); 
});