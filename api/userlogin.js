var express = require('express');
var http = require('http');
var CRUD = require('mysql-crud');
var env = require('./environment');
var common_API = require('./commonAPI');
var connection = env.Dbconnection;
var userCRUD = CRUD(connection, 'authenticateUser');

exports.login = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    
    var query = "SELECT users.user_Id, users.user_Type FROM users WHERE email_Id = '"+ email +"' AND user_Password = '"+ password +"'";

    connection.query(query, function(error, user, fields) {
        if (error == null) {
            if (user.length > 0) {
                common_API.getUserDetails(user[0],function(userdetails){
                    console.log("userdetails_43",userdetails[0]);
                    var resdata = {
                        status : true,
                        record : userdetails[0],
                        message : 'Successfully login welcome'
                    }
                    res.jsonp(resdata); 
                })
            } else {
                var resdata = {
                    record: '',
                    status: false,
                    message: 'Wrong user name or password.'
                };
                res.jsonp(resdata);
            }
        } else {
            var resdata = {
                record: '',
                status: false,
                message: 'Server not responding.'
            };
            res.jsonp(resdata);
        }
    });
}