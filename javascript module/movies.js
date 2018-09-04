var myMovies = [
	{
		title: "Garota dinamarquesa",
		rating: 4,
		hasWatched: true
	},
	{
		title: "Um sonho de liberdade",
		rating: 5,
		hasWatched: false
	},
	{
		title: "Mad Max",
		rating: 4.5, 
		hasWatched: false
	}
];

myMovies.forEach(function(movie){
	console.log(buildString(movie));
});


function buildString(movie){
	var result = "You have "
	if(movie.hasWatched){
		result += "watched ";
	} else {
		result += "not seen ";
	}
	result += "\"" + movie.title + "\" - ";
	result += movie.rating + " stars";

	return result;
}