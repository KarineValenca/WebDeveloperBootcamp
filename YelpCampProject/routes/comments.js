var express = require("express")
var router = express.Router({mergeParams: true})
var Campground = require("../models/campground")
var Comment = require("../models/comment")
var middleware = require("../middleware")

router.get("/new", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(!err){
			res.render("comments/new", {campground: campground})
		}else {
			console.log(err)
		}
	})
	
})

router.post("/",middleware. isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(!err) {
			Comment.create(req.body.comment, function(err, comment){
				if(!err){
					comment.author.id = req.user._id
					comment.author.username = req.user.username
					comment.save()
					campground.comments.push(comment)
					campground.save()
					req.flash("success", "Successfully added comment")
					res.redirect("/campgrounds/" + campground._id)
				}else {
					req.flash("error", "Ops, something went wrong")
					console.log(err)
				}
			})
		}else {
			console.log(err);
			res.redirect("/campgrounds")
		}
	})
})

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, comment){
		if(err){
			res.redirect("back")
		}else{
			res.render("comments/edit", {campground_id: req.params.id, comment: comment})
		}
	})
	
})

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
		if(err){
			res.redirect("back")
		}else{
			res.redirect("/campgrounds/" + req.params.id)
		}
	})
})

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err, comment){
		if(err){
			res.redirect("back")
		}else{
			req.flash("success", "Comment deleted")
			res.redirect("/campgrounds/" + req.params.id)
		}
	})
})

module.exports = router