function average(arr) {
	var sum = 0;
	for (var i = 0; i < arr.length; i++){
		sum += arr[i];
	}
	averageT = sum/arr.length;
	var roundAverage = Math.round(averageT);
	return roundAverage;
}

var scores = [90, 98, 89, 100, 100, 86, 94];
console.log(average(scores));

var scores2 = [46, 65, 77, 82, 80, 54, 73, 63, 95, 49];
console.log(average(scores2));