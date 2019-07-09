const fs = require('fs');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "dbpassword",
  database: "notes_db",
  multipleStatements: true
})

fs.readFile("../seed.sql", "utf-8", function(err, data){
  connection.query(data, function(){
    console.log("Seeding done");
    connection.end();
  });
})
// connection.connect(function(err){
//   if(err) throw err;
//
//   console.log(`connected as id ${connection.threadId}`)
//
// })
