//for database connection
var mysql = require('mysql');
var http = require('http');

var enviroment = {
	Dbconnection : mysql.createPool({
			database : 'scm_db_ver1',
		    user : 'admin-db-user',
			password : 'REDhelvetica!@3',
		    host :'evolveworx.com',
	}),
	
	/** Function For Time stamp**/
	timestamp: function() {
      var UTCtimestamp = new Date();
      return UTCtimestamp.getTime();
    }
}
module.exports = enviroment;
 

