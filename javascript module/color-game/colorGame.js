var numberOfSquares =6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll	(".mode");

init();

function init(){
	setUpModeButtons();
	setUpSquares();
	reset();
}

function setUpModeButtons(){
	for(var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			
			this.textContent === "Easy" ? numberOfSquares = 3: numberOfSquares = 6;
			reset();
		});
	}
}

function setUpSquares(){
	for (var i = 0; i < squares.length; i++){

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
}

function reset(){
	// generete all new colors
	colors = generateRandomColors(numberOfSquares);
	// pick a random color from array
	pickedColor = pickColor();
	// change color display to match picked color
	colorDisplay.textContent = pickedColor;
	//change colors of squares
	for (var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}else{
			squares[i].style.display = "none";
		}
			
	}
	h1.style.backgroundColor = "steelblue";
	resetButton.textContent = "New colors";
	messageDisplay.textContent = "";
}



resetButton.addEventListener("click", function(){
	reset();
});



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
