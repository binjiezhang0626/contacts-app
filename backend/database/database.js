/* eslint-disable no-shadow */
require('dotenv').config();
const mysql = require('mysql');

// MySQL Configuration
const mysqlConnectionPool = mysql.createConnection(`${process.env.CLEARDB_DATABASE_URL}&connectionLimit=10`);

const queryWithPromise = (queryStatement, queryInput = []) => new Promise(
  (resolve, reject) => {
    mysqlConnectionPool.getConnection((error, connection) => {
      if (error) throw error;
      connection.query(queryStatement, queryInput, (error, result) => (
        error ? reject(error) : resolve(result)
      ));
      connection.release();
    });
  },
);

module.exports = queryWithPromise;
