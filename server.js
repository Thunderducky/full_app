const express = require("express");
const mysql = require('mysql');
const app = express();
const PORT = process.env.PORT || 3000;

let connection = null;
if(process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "dbpassword",
    database: "notes_db"
  })
}


connection.connect(function(err){
  if(err) throw err;

  console.log(`connected as id ${connection.threadId}`)
})
// MIDDLE WARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// app.get('/', function(req, res){
//   res.send('test')
// })


app.get('/api/notes', function(req, res){
  connection.query("SELECT * FROM notes;", function(err, data){
    if(err) throw err;

    res.json(data);
  })

});

app.post('/api/notes', function(req, res){
  const query = `INSERT INTO notes (text) VALUES ( ?)`;
  connection.query(query, [req.body.text], function(err){
    if(err){
      return res.send(500);
    }
    res.json(true);
  })
});

app.delete('/api/notes/:id', function(req, res){
  const query = `DELETE FROM notes WHERE id = ?`;
  connection.query(query, [req.params.id], function(err){
    if(err){
      return res.send(500);
    }
    res.json(true);
  })
});

app.listen(PORT, function(){
  console.log("Listening on Port :" + PORT)
})
