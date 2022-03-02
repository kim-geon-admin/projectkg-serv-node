var mysql      = require('mysql2');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'master',
  database : 'project'
});
 
connection.connect();

module.exports = connection;