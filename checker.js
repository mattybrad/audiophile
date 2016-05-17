var fs = require("fs");
var path = require("path");
var id3 = require("id3js");
var baseFolder = "music";

checkTrack('Bright Eyes', 'Cassadaga', 'Bright Eyes - Hot Knives.mp3', function(result) {
    console.log("RESULT:");
    console.log(result);
});

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
