import mysql from 'mysql2'
import util from 'util'
import dotenv from 'dotenv'

dotenv.config()
const connect = mysql.createConnection({
  host: "127.0.0.1",
  port: "3300",
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});


connect.connect((err)=> {
  if(err){
    console.log("Error connection ", err)
  }else{
    console.log("Connection successful")
  }
})

//promise wrapper to enable asynce await with mysql
connect.query = util.promisify(connect.query).bind(connect)
module.exports = connect
