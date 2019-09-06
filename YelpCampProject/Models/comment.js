var mongoose = require("mongoose")

//schema setup
const commentSchema = new mongoose.Schema({
	text: String,
	author: String
});

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment