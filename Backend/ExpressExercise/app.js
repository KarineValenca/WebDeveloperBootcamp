var express = require("express");
var app = express();

// "/" => "Hi, There!"
app.get("/", function(req, res){
	console.log("SOMEONE MADE A REQUEST TO /");
	res.send("Hi, there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res){
	var sounds = {
		ping: "Oink",
		cow: "Moo",
		dog: "Woof Woof!", 
		cat: "Meow <3"
	}
	var animal = req.params.animal.toLowerCase();
	var sound = sounds[animal];
	if(animal === "pig"){
		sound = "oink";
	} else if (animal == "cow"){
		sound = "moo";
	} else if (animal === "dog") {
		sound = "Woof Woof!"
	}

	res.send("The " + animal + " says '" + sound + "'");
});

app.get("/repeat/:word/:number", function(req, res){
	var number = Number(req.params.number);
	var word = req.params.word;
	var result = "";
	for(var i = 0; i < number; i++) { 
		result += word + " ";
	} 
	res.send(result);
});

app.get("/*", function(req, res){
	res.send("Sorry, page not found...What are you doing with your life?");
});

// Tell Express to listen for requests (start server)
app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});