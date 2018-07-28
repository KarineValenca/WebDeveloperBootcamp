// create secret number
var secretNumber = 4;

// ask to user for guest
var stringGuess = prompt("Guess a number!");
var guess = Number(stringGuess);

// check if guess is right
if(guess == secretNumber){
	alert("You got it!");
}
// check if guess is higher
else if(guess > secretNumber){
	alert("Too high. Guess again.");
}
// check if lower
else if(guess < secretNumber){
	alert("Too low. Guess again.");
}

else{
	alert("Invalid value. Try again.")
}
