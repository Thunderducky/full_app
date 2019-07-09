const fs = require('fs');
const mysql = require('mysql');
let connection = null;
if(process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "dbpassword",
    database: "notes_db",
    multipleStatements: true
  })
}

fs.readFile("../seed.sql", "utf-8", function(err, data){
  connection.query(data, function(){
    console.log("Seeding done");
    connection.end();
  });
})
