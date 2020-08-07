require('dotenv').config();
const mysql = require('mysql');

// MySQL Configuration
const mysqlConnection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);

const queryWithPromise = (queryStatement, queryInput = []) => new Promise(
  (resolve, reject) => {
    mysqlConnection.query(queryStatement, queryInput, (error, result) => (
      error ? reject(error) : resolve(result)
    ));
  },
);

module.exports = queryWithPromise;
