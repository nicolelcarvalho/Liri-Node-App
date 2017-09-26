// Load the node modules
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');


// Access all of the exports in our keys.js file with the require keyword
// Store certain exported keys in their own variable
var keys = require("./keys.js");
var T = new Twitter(keys.twitterKeys);
var S = new Spotify(keys.spotifyKeys);

// Store the user's input (process.argv[2]) into a variable called command
var command = process.argv[2];


// Get all of the user's input and store it into a variable (it will be stored as an array)
var allArgs = process.argv;

// Allow the user to input more than word and put it into a string by iterating through the allArgs array
var liriArg = "";

	for (var i = 3; i < allArgs.length; i++) {
		if(i > 3 && i < allArgs.length) {
			liriArg = liriArg + " " + allArgs[i];
		} else {
			liriArg += allArgs[i];
		}
	}




// Create a function to store getting tweets
function getTweets() {

	var params = {
		screen_name: 'RutgersLiri',
		count: 20
	};

	T.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if ( (!error) && (command === "my-tweets") ) {
	  	for (var i = 0; i < tweets.length; i++) {
	  		console.log(tweets[i].user.screen_name + ": " + tweets[i].text + " (Tweeted on: " + tweets[i].created_at + ")");
	  	}
	  }
	});

}
 

// Create a function to store spotifying a specified song
function runSpotify(song) { 

	// Create a variable to hold a song to input into the search query
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
		var previewLink = JSON.stringify(data.tracks.items[0].album.external_urls.spotify);
		var albumName = JSON.stringify(data.tracks.items[0].album.name);

	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }

	  else if ((!err) && (command === "spotify-this-song")) {
	  	console.log("Artist: " + artistName + "\nSong name: " + spotifySong + "\nPreview the song: " + previewLink + "\nAlbum: " + albumName); 
	  }
	});

}




// Run certain functions based on what command was typed
if (command === "my-tweets") {
	getTweets();
}

else if (command === "spotify-this-song") {
	runSpotify(liriArg);
}




