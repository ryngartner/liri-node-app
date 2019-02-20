require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");

var userInput = process.argv[2];
var query = process.argv[3];

if (userInput === "spotify-this-song") {
    var songQuery = process.argv.slice(3)
    console.log(songQuery);
    runSpotify(songQuery);
}
    else if (userInput === "concert-this") {
        runConcert(query);
        console.log("Concert This!");
    }

    else if (userInput === "movie-this") {
        console.log("Movie This!")
    }

    else if (userInput === "do-what-it-says") {
        console.log("Do What It Says")
    };

function runSpotify(spotifyQuery){

var spotify = new Spotify(keys.spotify);

if (spotifyQuery == false) {
    spotifyQuery = "the sign ace of base";
}
spotify.search({ type: 'track', query: spotifyQuery }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    else {
    for (i = 0; i < data.tracks.items.length; i++){
        var artistName = data.tracks.items[i].artists.map(function(artist){
            return artist.name;
        })
        console.log(artistName);
        var artistSong = data.tracks.items[i].name;
        console.log(artistSong);
        var artistPre = data.tracks.items[i].preview_url;
        console.log(artistPre);
        var artistAlbum = data.tracks.items[i].album.name;
        console.log(artistAlbum);
        console.log("---------------------");
    }
}
//   console.log(data.items); 
});
};

function runConcert(artist){
    axios.get('https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp')
  .then(function (response) {
      for (i = 0; i < response.data.length; i++){
        console.log(response.data[i].venue.name);
      } 
  })
  .catch(function (error) {
    console.log(error);
  });

}