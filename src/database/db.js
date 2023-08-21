const mysql = require('mysql')
const util = require('util')
const dotenv = require('dotenv')
dotenv.config()
const database = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});


//promise wrapper to enable asynce await with mysql
database.query = util.promisify(database.query).bind(database)
module.exports = database;
