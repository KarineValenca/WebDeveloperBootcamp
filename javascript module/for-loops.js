// first problem
console.log("print all numbers between -10 and 19");

for(var num1 = -10; num1 <= 19; num1++) {
	console.log(num1);
}


// second problem
console.log("print all even numbers between 10 and 40");

for (var num2 = 10; num2 <= 40; num2+=2) {
	console.log(num2);
}

//third problem
console.log("print all odd numbers between 300 and 333");

for (var num3 = 300; num3 <= 333; num3++) {
	if(num3 % 2 !== 0){
		console.log(num3);
	}
}

//fourth problem
console.log("print all numbers divisible by 5 and 3 between 5 and 50");

for (var num4 = 5; num4 <= 50; num4++) {
	if(num4 % 5 == 0 && num4 % 3 == 0){
		console.log(num4);
	}
}
