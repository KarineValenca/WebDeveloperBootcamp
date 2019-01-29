var colors = generateRandomColors(6);

var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");

colorDisplay.textContent = pickedColor;

resetButton.addEventListener("click", function(){
	// generete all new colors
	colors = generateRandomColors(6);
	// pick a random color from array
	pickedColor = pickColor();
	// change color display to match picked color
	colorDisplay.textContent = pickColor();
	//change colors of squares
	for (var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = colors[i];
	}
	h1.style.backgroundColor = "#232323";
	resetButton.textContent = "New colors";
});


for (var i = 0; i < squares.length; i++){
	//add initial color to squares
	squares[i].style.backgroundColor = colors[i];

	squares[i].addEventListener("click", function(){
		//grab color of clicked square
		
		var clickedColor = this.style.backgroundColor;
		//compare color to picket color
		if (clickedColor === pickedColor) {
			messageDisplay.textContent = "Correct!";
			resetButton.textContent = "Play Again?"
			changeColors(clickedColor);
			h1.style.backgroundColor = clickedColor;
		}else {
			messageDisplay.textContent = "Try Again";
			this.style.backgroundColor = "#232323";
		}
	});
}


function changeColors(color){
	//loop through all squares
	for (var i = 0; i < squares.length; i++){
	//change each color to match given color
		squares[i].style.backgroundColor = color;	
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	// make an array
	var arr = []
	
	// repeat num times
	for(var i = 0; i < num; i++){
		// get Random color and push into arr
		arr.push(randomColor());
	}
	//return the array
	return arr;
}

function randomColor(){
	//pick a "red" from 0 -255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from 0 -255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from 0 -255
	var b = Math.floor(Math.random() * 256);

	return "rgb(" + r + ", " + g + ", " + b + ")";
}
