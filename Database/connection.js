const mysql = require('mysql')

//My sql connection 
var myConnection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "softwider",
    port : "3306",
    multipleStatements : true
});

myConnection.connect((err) => {
    if (!err) {
        console.log("Connection done");        
    } else {
        console.log("Connection fail " + err);
    }
});


module.exports = myConnection