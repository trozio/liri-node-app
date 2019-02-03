console.log("Loading API keys...");

exports.spotify = {
	id: process.env.SPOTIFY_ID,
	secret: process.env.SPOTIFY_SECRET
};

exports.omdb = {
	key: process.env.OMDB_KEY
};
