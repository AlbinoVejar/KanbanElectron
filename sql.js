function sqlModule() {
    const sql = require('sqlite3').verbose();
    // const db = new sql.Database('./src/assets/database.db', (err) => {
    const db = new sql.Database('./dist/assets/database.db', (err) => {
        if (err) console.error(err.message);
    });
    //Convert Promise
    const getPromise = (query) => {
        return new Promise((resolve, reject) => {
            db.get(query, (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    };
    const getAllPromise = (query) => {
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    };
    const insertPromise = (query) => {
        return new Promise((resolve, reject) => {
            db.run(query, (err) => {
                if (err) return reject(err);
                resolve(this.LastId);
            });
        });
    };
    const updatePromise = (query) => {
        return new Promise((resolve, reject) => {
            db.run(query, (err) => {
                if (err) return reject(err);
                resolve(this.changes);
            });
        });
    };
    const deletePromise = (query) => {
        return new Promise((resolve, reject) => {
            db.run(query, (err) => {
                if (err) return reject(err);
                resolve(this.changes);
            });
        });
    };

    // Functions
    this.getOne = (query) => {
        return getPromise(query);
    };
    this.getAll = (query) => {
        return getAllPromise(query);
    };
    this.insert = (query) => {
        return insertPromise(query);
    };
    this.update = (query) => {
        return updatePromise(query);
    };
    this.delete = (query) => {
        return deletePromise(query);
    };
    this.cerrar = () => {
        db.close();
    };
}
module.exports = sqlModule;