// This is a Node JS application called "LIRI"
// LIRI takes in parameters through the command line
// Enter the following into the command line to see what LIRI can do:
	// node liri.js my-tweets
	// node liri.js spotify-this-song '<song name here>'
	// node liri.js movie-this '<movie name here>'
	// node liri.js do-what-it-says 


// Begin application
// Load the node modules
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");


// Access all of the exports in our keys.js file with the require keyword
// Store certain exported keys in their own variable
var keys = require("./keys.js");
var T = new Twitter(keys.twitterKeys);
var S = new Spotify(keys.spotifyKeys);

// Store the user's input (process.argv[2]) into a variable called command
var command = process.argv[2];

// Get all of the user's input and store it into a variable (it will be stored as an array)
// By not specifying an index value, we are able to obtain inputs of more than one word
var allArgs = process.argv;
 
// Iterate through the allArgs array to turn the values into a string and store the string in a variable called liriArg
var liriArg = "";

	for (var i = 3; i < allArgs.length; i++) {
		if(i > 3 && i < allArgs.length) {
			liriArg = liriArg + " " + allArgs[i];
		} else {
			liriArg += allArgs[i];
		}
	}



// Create a function to store getting tweets from Twitter
// See below where the function is called (dependent upon the command given)
function getTweets() {

	var params = {
		screen_name: 'RutgersLiri',
		count: 20
	};

	T.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if ( (!error) && (command === "my-tweets") ) {
	  	for (var i = 0; i < tweets.length; i++) {
	  		console.log(tweets[i].user.screen_name + ": " + tweets[i].text + " (Tweeted on: " + tweets[i].created_at + ")");

			  // Append the content to the "log.txt file"
			  fs.appendFile("log.txt", (tweets[i].user.screen_name + ": " + tweets[i].text + " (Tweeted on: " + tweets[i].created_at + ")" + "\n"), function(err) {

				  	if(err) {
				  		console.log(err);
				  	}
		  	}); // End .appendFile
	  	} // End for loop
		} // End if statement
	}); // End request
} // End getTweets function
 

// Create a function to store spotifying a specified song
// See below where the function is called (dependent upon the command given)
function runSpotify(song) { 

	// Create a variable to hold a song that will be inputted into the search query
	var spotifySong;
	
	// If no song was passed into the function, then default the search to find "The Sign Ace of Base"
	 if (song === "") {
	 		spotifySong = "The Sign Ace of Base";

	 } else {
	 	// Else if a song was passed through into the function, run the query with the specified song
	 		spotifySong = song;
	 }


	S.search({ type: 'track', query: spotifySong }, function(err, data) {

		var artistName = JSON.stringify(data.tracks.items[0].album.artists[0].name);
		var songName = JSON.stringify(data.tracks.items[0].name);
		var previewLink = JSON.stringify(data.tracks.items[0].preview_url);
		var albumName = JSON.stringify(data.tracks.items[0].album.name);


	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }

	  else if ((!err) && (command === "spotify-this-song") && (previewLink !== null)) {
	  	console.log("Artist: " + artistName + "\nSong name: " + songName + "\nPreview the song: " + previewLink + "\nAlbum: " + albumName); 

 				// Append the content to the "log.txt file"
			  fs.appendFile("log.txt", ("\nArtist: " + artistName + "\nSong name: " + songName + "\nPreview the song: " + previewLink + "\nAlbum: " + albumName + "\n"), function(err) {

				  	if(err) {
				  		console.log(err);
				  	}
		  	}); // End .appendFile
	  	} // End else if statement
	}); // End request
} // End runSpotify function


// Create a function to store getting a movie from the OMDB database
// See below where the function is called (dependent upon the command given)
function getMovie(movie) { 

	// Create a variable to hold a movie name that will be inputted into the request url
	var movieName;

	// If no movie was passed into the function, then default the search to find the movie "Mr. Nobody"
	if (movie === "") {
		movieName = "Mr. Nobody";

	} else {
	// Else if a movie was passed into the function, then run the query with the specified movie name
		movieName = movie;
	}

	// Then run a request to the OMDB API with the movie specified
	request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

	  // If error is true console.log an error message
		if (error) {
			// Return stops the execution after the below console.log ouput
			return console.log("IMDB wasn't able to locate data on the requested movie. Please check your spelling or request another movie.");
		}

		// Else if the request is successful (i.e. if the response status code is 200), get and console.log movie data
	  else if (!error && response.statusCode === 200){ 
	  	var data = JSON.parse(body);

	    console.log("Movie Title: " + data.Title + "\nYear Released: " + data.Year + "\nIMDB Rating: " + data.Ratings[0].Value + "\nRotten Tomatoes: " + data.Ratings[1].Value + "\nCountry Produced: " + data.Country + "\nLanguage: " + data.Language + "\nPlot: " + data.Plot + "\nCast: " + data.Actors);

	 				// Append the content to the "log.txt file"
			  fs.appendFile("log.txt", ("\nMovie Title: " + data.Title + "\nYear Released: " + data.Year + "\nIMDB Rating: " + data.Ratings[0].Value + "\nRotten Tomatoes: " + data.Ratings[1].Value + "\nCountry Produced: " + data.Country + "\nLanguage: " + data.Language + "\nPlot: " + data.Plot + "\nCast: " + data.Actors + "\n"), function(err) {

				  	if(err) {
				  		console.log(err);
				  	}
		  	}); // End .appendFile  
	  } 
	});

}


// Create a function to store reading the text from the "random.txt" file
// See below where the function is called (dependent upon the command given)
function runRandom() {

	// This block of code will read from the "random.txt" file.
	// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
	// The code will store the contents of the reading inside the variable "data"
	fs.readFile("random.txt", "utf8", function(error, data) {

		// Split the data by commas (to make it more readable)
		// This will display the content as an array if we were to print it out
		var dataArr = data.split(",");
		command = dataArr[0].trim();
		var param = dataArr[1].trim();

	  // If the code experiences any errors it will log the error to the console.
	  if (error) {
	    return console.log(error); // Return stops the execution after console.log(error)
	  } 
	  else if (command === "spotify-this-song") {
		  	runSpotify(param);
		}

	});
}


	// Call certain functions based on what command was typed
	if (command === "my-tweets") {
		getTweets();
	}

	else if (command === "spotify-this-song") {
		runSpotify(liriArg);
	}

	else if (command === "movie-this") {
		getMovie(liriArg);
	}

	else if (command === "do-what-it-says") {
		runRandom();
	}





