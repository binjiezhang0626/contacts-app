require('dotenv').config();
const mysql = require('mysql');

// MySQL Configuration
const mysqlConnection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
module.exports = mysqlConnection;
