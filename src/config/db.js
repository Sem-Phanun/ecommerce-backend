const mysql = require('mysql2')
const util = require('util')
const dotenv = require('dotenv')
dotenv.config()
const database = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});


database.connect((err)=> {
  if(err){
    console.log("Error connection ", err)
  }else{
    console.log("Connection successful")
  }
})

//promise wrapper to enable asynce await with mysql
database.query = util.promisify(database.query).bind(database)
module.exports = database;
