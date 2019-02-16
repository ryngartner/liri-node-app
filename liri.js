require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
spotify.search({ type: 'track', query: 'The Sign' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
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
   
//   console.log(data.items); 

  });