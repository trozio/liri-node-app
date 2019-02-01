let axios = require("axios");
let dotenv = require("dotenv").config();
let Spotify = require('node-spotify-api');
var moment = require('moment');
moment().format();

 let command = process.argv[2];
 let question = process.argv[3];

	if(command === "concert-this"){
  axios.get("https://rest.bandsintown.com/artists/" + question + "/events?app_id=codingbootcamp").then(
    function(response) {
      console.log("Upcoming concert: " + response.data[0].venue.name + ", " + response.data[0].venue.city + ", " + response.data[0].venue.country + " " + moment(response.data[0].datetime).format("MM-DD-YYYY"));
    }
)};


	if(command[2] === "spotify-this-song"){


var spotify = new Spotify(keys.spotify);

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

console.log(data);
});
	}
	if(command[2] === "movie-this"){

	}
	if(command[2] === "do-what-it-says"){

	}
