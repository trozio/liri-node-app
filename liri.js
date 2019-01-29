require("dotenv").config();


let axios = require("axios");

 let command = process.argv[2];
 let question = process.argv[3];

	if(command === "concert-this"){
  axios.get("https://rest.bandsintown.com/artists/" + question + "/events?app_id=codingbootcamp").then(
    function(response) {
      console.log(response.name);
    }
  );

	}
	if(command[2] === "spotify-this-song"){

	}
	if(command[2] === "movie-this"){

	}
	if(command[2] === "do-what-it-says"){

	}
