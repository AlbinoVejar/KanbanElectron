(
    function() {
        "use strict";
        var express = require('express');
        var app = express();

        app.get('/', function(req, res) {
            res.send("Hello world");
        });
        var server = app.listen(3000, function() {
            console.log('Express server listening on port');
            console.log(server.address().port());
        });

        module.exports = serviceApp;
    }()
);