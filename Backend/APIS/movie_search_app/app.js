const request = require('request');
const express = require('express');
const app = express();
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("search")
})

app.get("/results", function(req, res){
	let query = req.query.search;
	const url = "http://www.omdbapi.com/?s=" 
	const apiKey = "&apikey=thewdb"
	request(url + query + apiKey, function(error, response, body){
		if(!error & response.statusCode == 200) {
			let data = JSON.parse(body)
			res.render("results", {data: data});
		}
	})
})

// Tell Express to listen for requests (start server)
app.listen(3000, function() { 
  console.log('Movie App has started!!!'); 
});