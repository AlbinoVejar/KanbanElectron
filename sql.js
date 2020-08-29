// var sqliteService = (function() {
//     var sql = require('sqlite3');

//     var db = new sql.Database('./src/assets/sample.db', function(err) {
//         if (err) {
//             console.log(err.message);
//         }
//         console.log('Connected to Database');
//     });
//     return {
//         buscar: function(callback) {
//             var query = 'SELECT * FROM Usuarios ORDER BY IdUsuario;';
//             db.get(query, function(err, row) {
//                 if (err) {
//                     throw err;
//                 }
//                 if (row) {
//                     callback(row.Nombre);
//                 }
//             });
//             db.close();
//         },
//         closed: function() {
//             db.close(function(err) {
//                 if (err) {
//                     console.error(err.message);
//                 }
//                 console.log('Database closed');
//             });
//         }
//     };
//     // var buscar = function() {
//     //     var query = 'SELECT * FROM Usuarios ORDER BY IdUsuario;';
//     //     db.all(query, function(err, rows) {
//     //         if (err) {
//     //             throw err;
//     //         }
//     //         rows.forEach(function(row) {
//     //             console.log(row);
//     //         });
//     //     });
//     //     db.close();
//     // };
// })();
// module.exports = sqliteService;
var sqlModule = (function() {
    var sql = require('sqlite3');
    var db = new sql.Database('./src/assets/sample.db', function(err) {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to Database');
    });
    return {
        buscar: function() {
            var query = 'SELECT * FROM Usuarios ORDER BY IdUsuario;';
            db.get(query, function(err, row) {
                if (err) { console.error(err.message); }
                if (row) {
                    console.log(row);
                    return row;
                }
            });
        }
    };
})();
module.exports = sqlModule;