const mysql = require('mysql2');
const { config } = require('./config');

console.log(config);

async function query(sql) {
    const connection = await mysql.createConnection(config);
    const queryPromise = new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            console.log('queryPromise ', err, result);
            if (err != null) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    })

    const queryResults = await queryPromise;

    connection.end();
    return queryResults;
}

async function queryMultiple(sql, values) {
    const connection = mysql.createConnection(config);

    const queryPromise = new Promise((resolve, reject) => {
        connection.query(sql, [values], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    })

    const queryResults = await queryPromise;

    connection.end();
    return queryResults;
}

const queryPromise = {
    query,
    queryMultiple
}

module.exports = { queryPromise };