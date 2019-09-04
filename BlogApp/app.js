const express    = require("express"),
	  app        = express(),
	  methodOverride = require("method-override"),
	  bodyParser = require("body-parser"),
	  expressSanitizer = require("express-sanitizer")
	  mongoose   = require("mongoose");


// APP CONFIG
mongoose.connect("mongodb://localhost:27017/blog_app", {useNewUrlParser: true})
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));


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
	req.body.blog.body = req.sanitize(req.body.blog.body);
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

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
	Blog.findById(req.params.id, function(err, blog){
		if(!err) {
			res.render("edit", {blog: blog})

		} else{
			res.redirect("blogs")
		}
	})
	
})

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, blog){
		if(!err) {
			res.redirect("/blogs/" + req.params.id)
		} else {
			res.redirect("/blogs")
		}
	})
})

// DESTROY ROUTE
app.delete("/blogs/:id", function(req, res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(!err) {
			res.redirect("/blogs")
		} else {
			res.redirect("/blogs")
		}
	})

})

// Tell Express to listen for requests (start server)
app.listen(3000, function() { 
  console.log('Blog Server has started!!!'); 
});