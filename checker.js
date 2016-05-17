var fs = require("fs");
var path = require("path");
var id3 = require("id3js");
var baseFolder = "music";

checkAlbum('Bright Eyes', 'Cassadaga', function(result) {
    console.log("RESULT:");
    console.log(result);
});

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
