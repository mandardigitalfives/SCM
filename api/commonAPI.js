//for database connection
var mysql = require('mysql');
var http = require('http');
var env = require('./environment');
var connection = env.Dbconnection;
var common_API = {

    getUserDetails: function(user, callback) {

        if (user.user_Type == 'owner') {
            var tableName = "owners";
        } else if (user.user_Type == "driver") {
            var tableName = "drivers";
        } else if (user.user_Type == "manager") {
            var tableName = "managers";
        }

        var query = "SELECT * FROM " + tableName + " WHERE user_Id = " + user.user_Id + "";

        connection.query(query, function(error, userdetails) {
            console.log("error", error);
            if (error == null) {
                if (userdetails.length > 0) {
                    userdetails[0].status = true;
                    userdetails[0].message = "Done.";
                    userdetails[0].user_Type = user.user_Type;
                    callback(userdetails);
                } else {
                    var resdata = {
                        status: false,
                        message: 'User Details Not Found.'
                    };
                    callback(resdata);
                }
            } else {
                var resdata = {
                    status: false,
                    message: 'Server not responding.'
                };
                callback(resdata);
            }
        });
    }
}

module.exports = common_API;
