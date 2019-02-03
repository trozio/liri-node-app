require("dotenv").config();

let keys = require("./keys.js")
let fs = require("fs");
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);
let moment = require('moment');
let axios = require("axios");

moment().format();

let command = process.argv[2];
let question = process.argv[3];

parseCommand(command, question);

function parseCommand(c, q) {
	if (c === "concert-this") {
		console.log("This artist function initialized...");
		searchArtist(q);
	};

	if (c === "spotify-this-song") {
		console.log("This song function initialized...");
		if(!q){
			q = "The Sign";
		}
		searchSongs(q);
	}
	if (c === "movie-this") {
		console.log("Movie this function initialized...");
		searchMovies(q);
	}
	if (c === "do-what-it-says") {
		console.log("Do what it says function initialized...");
		randomize();
	}
}

function searchArtist(q) {
	axios.get("https://rest.bandsintown.com/artists/" + question + "/events?app_id=codingbootcamp").then(
		function(response) {
			console.log("Upcoming concert: " + response.data[0].venue.name + ", " + response.data[0].venue.city + ", " + response.data[0].venue.country + " " + moment(response.data[0].datetime).format("MM-DD-YYYY"));
		}
	);
}

function searchSongs(q) {
	console.log("Accessing Spotify API...");
	spotify.search({
		type: "track",
		query: q,
		limit: 5
	}, function(error, response) {
		if (error) {
			console.log("Error: " + error);
		}
		for (var i = 0; i < response.tracks.items.length; i++) {
			let song = response.tracks.items[i];
			let artists = song.artists;
			let artistNames = "";
			for (var j = 0; j < artists.length; j++) {
				artistNames += artists[j].name + ", ";
			}
			console.log("Song " + (i + 1) + " is " + song.name);
			console.log("Album: " + song.album.name);
			console.log("Artists: " + artistNames.substring(0, artistNames.length - 2));
			console.log("URL: " + song.preview_url + "\n\n");
		}
		// console.log(response.tracks.items);
	});
}

function searchMovies(q) {
	console.log("Accessing OMDB API...");
	axios.get("http://www.omdbapi.com/?apikey=" + keys.omdb.key + "&t=" + question + "&plot=short").then(
		function(response) {
			let movie = response.data;
			console.log("Movie Name: " + movie.Title);
			console.log("Movie Year: " + movie.Year);
			console.log("IMDB Rating: " + movie.imdbRating);
			console.log("Language: " + movie.Language);
			console.log("Country of Origin: " + movie.Country);
			console.log("Plot: " + movie.Plot);
			console.log("Actors: " + movie.Actors);
		}
	);
}

function randomize() {
	console.log("Reading random.txt file...");
	fs.readFile("random.txt", "utf8", (err, data) => {
		if (err) throw err;
		let text = data.split(", ");
		console.log(text[0]);
		parseCommand(text[0], text[1]);
	});
}
