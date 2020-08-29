const sqliteService = require('./sql');

(
    function() {
        "use strict";
        var express = require('express');
        var app = express();
        require('./sql');

        // var db = new sql.Database('./src/assets/sample.db', (err) => {
        //     if (err) {
        //         console.log(err.message);
        //     }
        //     console.log('Connected to Database');
        // });

        app.get('/', function(req, res) {
            res.send("Hello world");
        });
        app.get('/buscar', function(req, res) {
            var h = sqliteService.buscar(req);
            res.send(req);
            // sqliteService.closed();
        });

        var server = app.listen(3000, function() {
            console.log('Express server listening on port');
            // console.log(server.address().port());
        });

        // var buscar = () => {
        //     var query = 'SELECT * FROM Usuarios ORDER BY IdUsuario;';
        //     db.all(query, (err, rows) => {
        //         if (err) {
        //             throw err;
        //         }
        //         rows.forEach((row) => {
        //             console.log(row);
        //         });
        //     });
        //     db.close();
        // };
        // module.exports = serviceApp;
    }()
);