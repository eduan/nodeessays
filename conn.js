var server = require("./server.js")
mysql = require("mysql"); 
     
var connection = mysql.createConnection({ 
    user: "root", 
    password: "", 
    database: ""
}); 

connection.query('SELECT 1', server.echo(JSON.stringify(rows)));

server.end();