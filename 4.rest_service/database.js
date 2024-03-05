const dotenv = require('dotenv')
const mysql = require('mysql2')

dotenv.config();

//verify the entries read from .env
// console.log(process.env.DATABASE_HOST);
// console.log(process.env.DATABASE_USER);
// console.log(process.env.DATABASE_PASSWORD);
// console.log(process.env.DATABASE_NAME);

//=============================================================================

//pass connection details as an obj to createConn method
//createConn returns object of type "Connection"
const connection = mysql.createConnection({

    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE_NAME

})


//calling connect method to connect to db
connection.connect((error)=>{

    if (error)
    {
        console.log('Cannot connect to DB :(')
        throw error;
    }
    else
      console.log('Connected to DB :)')

});

//========================================================================

module.exports.dbconn = connection;