require("dotenv").config();

//Set require variables
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");


//Set user input variable
var userInput = process.argv[2];
if (process.argv[3] != undefined) {
    var queryFromCommandLine = process.argv.slice(3).join(" ")
} else var queryFromCommandLine = undefined;


//Set a function to handle user input 
function handleUserInput(userInput, queryPassedIntoFunction) {

    if (userInput === "spotify-this-song") {
        var songQuery = queryPassedIntoFunction
        console.log(songQuery);
        runSpotify(songQuery);
        console.log("Spotify This Song!")
    } else if (userInput === "concert-this") {
        runConcert(queryPassedIntoFunction);
        console.log("Concert This!");
    } else if (userInput === "movie-this") {
        var movieQuery = queryPassedIntoFunction
        console.log(movieQuery);
        runMovie(movieQuery);
        console.log("Movie This!")
    } else if (userInput === "do-what-it-says") {
        runDoit();
        console.log("Do What It Says")
    } else {
        console.log("Try Again!!!")
    };

}
handleUserInput(userInput, queryFromCommandLine);


//Spotify-this-song function
function runSpotify(spotifyQuery) {

    var spotify = new Spotify(keys.spotify);

    if (spotifyQuery == false) {
        spotifyQuery = "the sign ace of base";
    }
    spotify.search({
        type: 'track',
        query: spotifyQuery
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            for (i = 0; i < data.tracks.items.length; i++) {
                var artistName = data.tracks.items[i].artists.map(function (artist) {
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
    });
};

//Concert-this function
function runConcert(artist) {
    axios.get('https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp')
        .then(function (response) {
            for (i = 0; i < response.data.length; i++) {
                console.log(response.data[i].venue.name);
                console.log(response.data[i].venue.city);
                console.log(response.data[i].venue.country);
                var dateTime = moment(response.data[i].datetime).format("MM/DD/YYYY");
                console.log(dateTime);
                console.log("-----------------------------");
            }
        })
        .catch(function (error) {
            console.log(error);
        });

}

//Movie-this function
function runMovie(title) {
    if (title === undefined) {
        title = "Mr. Nobody";
    }
    axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=55e8eecb&t=' + title)
        .then(function (response) {
            console.log("Title: ", response.data.Title);
            console.log("Year: ", response.data.Year);
            console.log("Rating: ", response.data.imdbRating);
            console.log("Rotten Tomatoes: ", response.data.Ratings[1].Value);
            console.log("Country: ", response.data.Country);
            console.log("Language: ", response.data.Language);
            console.log("Plot: ", response.data.Plot);
            console.log("Actors: ", response.data.Actors);
        })
}

//Do-what-it-says function
function runDoit() {
    fs.readFile('random.txt', "utf8", function (err, textFromFile) {
        // console.log(textFromFile);
        var x = textFromFile.split(',');
        console.log(x);
        var command = x[0];
        var FromRandomTextFile = x[1];
        // runSpotify(query);
        handleUserInput(command, FromRandomTextFile);
    });
}
