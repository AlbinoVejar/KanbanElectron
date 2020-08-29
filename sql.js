function sqlModule() {
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
    const getAllPromise = (query, params) => {
        return new Promise((resolve, reject) => {
            db.all(query, params, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    };
    const insertPromise = (query, params) => {
        return new Promise((resolve, reject) => {
            db.run(query, params, (err) => {
                if (err) return reject(err);
                resolve('Se guardó con exito');
            });
        });
    };
    const updatePromise = (query, params) => {
        return new Promise((resolve, reject) => {
            db.run(query, params, (err) => {
                if (err) return reject(err);
                resolve('Se actualizó con exito');
            });
        });
    };
    const deletePromise = (query, params) => {
        return new Promise((resolve, reject) => {
            db.run(query, params, (err) => {
                if (err) return reject(err);
                resolve('Se eliminó con exito');
            });
        });
    };

    // Functions
    this.getOne = (query, params) => {
        return getPromise(query, params);
    };
    this.getAll = (query, params) => {
        return getAllPromise(query, params);
    };
    this.insert = (query, params) => {
        return insertPromise(query, params);
    };
    this.update = (query, params) => {
        return updatePromise(query, params);
    };
    this.delete = (query, params) => {
        return deletePromise(query, params);
    };
    this.cerrar = () => {
        db.close();
    };
}
module.exports = sqlModule;