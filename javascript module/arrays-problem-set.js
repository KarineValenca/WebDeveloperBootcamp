// prints the reverse from a list
function printReverse(list){	
	for(var i = list.length - 1; i >=0; i--) {
		console.log(list[i]);
	}
}


// verify if all elements in array are equals
function isUniform(list){
	for(var i = 0; i < list.length - 1; i++) {
		if(list[i] !== list[i+1]){
			return false;
		}
	}

	return true;
}


// do the sum of all elements in array
function sumArray(list){
	var sum = 0;
	list.forEach(function(element){
		sum += element;
	});

	return sum;
}


// verify the biggest number in array
function max(list){
	var biggest = list[0];
	for(var i = 1; i < list.length; i++){
		if(list[i] > biggest){
			biggest = list[i];
		}
	}
	return biggest;
}