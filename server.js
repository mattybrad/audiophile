var express = require("express");
var checker = require("./checker.js");
var app = express();
var port = 3000;

app.get('/', function(req, res) {
    checker.checkCollection(function(result) {
        var out = "AUDIOPHILE music collection evaluator<br>";
        out += JSON.stringify(result);
        res.send(out);
    });
});

app.listen(port, function() {
    console.log("App listening, port " + port);
});
