//for database connection
var mysql = require('mysql');

config.connection = mysql.createConnection({
  host     : '',
  user     : '',
  password : '',
  database : 'microlise'
});

module.exports = config;
