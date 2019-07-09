const fs = require('fs');
const mysql = require('mysql');
const path = require("path");
let connection = null;
if(process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL);
  console.log(connection);
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

fs.readFile(path.join(__dirname, "../seed.sql"), "utf-8", function(err, data){
  console.log(err);
  console.log(data);
  // connection.query(data, function(err){
  //   console.log(err);
  //   console.log("Seeding done");
  //   connection.end();
  // });
});
