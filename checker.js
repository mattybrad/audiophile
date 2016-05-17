var fs = require("fs");
var path = require("path");
var id3 = require("id3js");
var baseFolder = "music";

checkCollection(function(result) {
    console.log("RESULT:");
    console.log(JSON.stringify(result));
});

function checkCollection(callback) {
    var files = fs.readdirSync(baseFolder);
    var artistsToCheck = [];
    var artistResults = [];

    function onArtistChecked(result) {
        artistResults.push(result);
        if(artistResults.length == artistsToCheck.length) callback(artistResults);
    }

    for(var i = 0; i < files.length; i ++) {
        if(fs.lstatSync(path.join(baseFolder, files[i])).isDirectory()) {
            artistsToCheck.push(files[i]);
        }
    }

    for(var i = 0; i < artistsToCheck.length; i ++) {
        checkArtist(artistsToCheck[i], onArtistChecked);
    }
}

function checkArtist(artistFolder, callback) {
    var files = fs.readdirSync(path.join(baseFolder, artistFolder));
    var albumsToCheck = [];
    var albumResults = [];

    function onAlbumChecked(result) {
        albumResults.push(result);
        if(albumResults.length == albumsToCheck.length) callback(albumResults);
    }

    for(var i = 0; i < files.length; i ++) {
        if(fs.lstatSync(path.join(baseFolder, artistFolder, files[i])).isDirectory()) {
            albumsToCheck.push(files[i]);
        }
    }

    for(var i = 0; i < albumsToCheck.length; i ++) {
        checkAlbum(artistFolder, albumsToCheck[i], onAlbumChecked);
    }
}

function checkAlbum(artistFolder, albumFolder, callback) {
    var files = fs.readdirSync(path.join(baseFolder, artistFolder, albumFolder));
    var tracksToCheck = [];
    var fileResults = [];

    function onTrackChecked(result) {
        fileResults.push(result);
        if(fileResults.length == tracksToCheck.length) callback(fileResults);
    }

    for(var i = 0; i < files.length; i ++) {
        switch(path.extname(files[i])) {
            case ".mp3":
            case ".wma":
            case ".flac":
            case ".wav":
            tracksToCheck.push(files[i]);
            break;

            default:
            // do nothing
        }
    }

    for(var i = 0; i < tracksToCheck.length; i ++) {
        checkTrack(artistFolder, albumFolder, tracksToCheck[i], onTrackChecked);
    }
}

function checkTrack(artistFolder, albumFolder, fileName, callback) {
    console.log(fileName);
    id3(
        {
            file: path.join(baseFolder, artistFolder, albumFolder, fileName),
            type: id3.OPEN_LOCAL
        },
        function(err, tags) {
            callback({
                artistMatchesFolder: tags.artist == artistFolder,
                albumMatchesFolder: tags.album == albumFolder
            });
        }
    );
}
