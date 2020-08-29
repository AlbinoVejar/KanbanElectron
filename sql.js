function sqlModule() {
    const util = require('util');
    const sql = require('sqlite3').verbose();
    const db = new sql.Database('./src/assets/sample.db', (err) => {
        if (err) console.error(err.message);
        console.log('Connected to Database');
    });
    //Convert Promise
    const getPromise = (query, params) => {
        return new Promise((resolve, reject) => {
            db.get(query, params, (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    };
    const getAllPromise = (query) => {
        return new Promise((resolve, reject) => {
            db.all(query, params, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    // Functions
    this.buscarOne = (query, params) => {
        return getPromise(query);
    }
    this.buscarAll = (query, params) => {
        return getAllPromise(query, params)
    }
    this.cerrar = () => {
        db.close();
    }
}
module.exports = sqlModule;