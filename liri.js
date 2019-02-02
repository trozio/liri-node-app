require("dotenv").config();
let keys = require("./keys.js")
let fs = require("fs");
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);
let moment = require('moment');

moment().format();

let command = process.argv[2];
let question = process.argv[3];

if (command === "concert-this") {
	axios.get("https://rest.bandsintown.com/artists/" + question + "/events?app_id=codingbootcamp").then(
		function(response) {
			console.log("Upcoming concert: " + response.data[0].venue.name + ", " + response.data[0].venue.city + ", " + response.data[0].venue.country + " " + moment(response.data[0].datetime).format("MM-DD-YYYY"));
		}
	)
};


if (command[2] === "spotify-this-song") {
	spotifySong();

}
if (command[2] === "movie-this") {

}
if (command[2] === "do-what-it-says") {

}



function spotifySong(question) {

	spotify.search({
		type: 'track',
		query: question,
		limit: 5
	}, function(err, data) {
		if (err) {
			console.log("Error: " + err);
		}

		console.log(data);
	});
}
