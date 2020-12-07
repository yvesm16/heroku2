var mysql = require('mysql2');
var connection = mysql.createConnection({
  multipleStatements:true,
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : 'password',
  database : 'nicehome'
});

connection.connect(function(err) {
    if (err){
      console.log(err);
      //throw err;
    } else {
      console.log('DB connected');
    }
});

module.exports = connection;
