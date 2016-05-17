var express = require("express");
var checker = require("./checker.js");
var _ = require("underscore");
var app = express();
var port = 3000;

app.get('/', function(req, res) {
    checker.checkCollection(function(result) {
        var out = "<h1>AUDIOPHILE music collection evaluator</h1>";

        // collection info
        out += "collection score = " + result.score + "%<br>";
        _.each(result.issues, function(val) {
            out += "collection issue: " + val + "<br>";
        });
        out += "<br>";

        // artist info
        _.each(result.artists, function(artist) {
            out += "<h2>" + artist.name + "</h2>";
            out += "artist score = " + artist.score + "%<br>";
            _.each(artist.issues, function(artistIssue) {
                out += "artist issue: " + artistIssue + "<br>";
            });

            // album info
            _.each(artist.albums, function(album) {
                out += "<h3>" + album.name + "</h3>";
                out += "album score = " + artist.score + "%<br>";
                _.each(album.issues, function(albumIssue) {
                    out += "album issue: " + albumIssue + "<br>";
                });

                // track info
                _.each(album.tracks, function(track) {
                    out += "<h4>" + track.name + "</h4>";
                    out += "track score = " + track.score + "<br>";
                    _.each(track.issues, function(trackIssue) {
                        out += "track issue: " + trackIssue + "<br>";
                    });

                });
            });
        });

        res.send(out);
    });
});

app.listen(port, function() {
    console.log("App listening, port " + port);
});
