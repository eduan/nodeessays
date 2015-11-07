var server = require("./server.js")
mysql = require("mysql"); 
     
var connection = mysql.createConnection({ 
    user: "root", 
    password: "pass", 
    database: "database"
}); 

connection.query('SHOW FULL TABLES', function(err, rows, fields){
    server.echo(JSON.stringify(rows))
});

server.end();