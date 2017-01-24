var express = require('express');
var http = require('http');
var CRUD = require('mysql-crud');
var env = require('./environment');
var connection = env.Dbconnection;
var userCRUD = CRUD(connection, 'authenticateUser');

exports.login = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    userCRUD.load({
        UserId: email,
        Password: password
    }, function(err, val) {
        console.log("err", err);
        var resdata = {
            record: '',
            status: false,
            message: 'Server not responding.'
        };
        if (err) {
            res.jsonp(resdata);
        }else if (val.length > 0) {
            resdata.record = val[0];
            resdata.status = true;
            resdata.message = 'Successfully login welcome ';
            res.jsonp(resdata);
        } else {
            resdata.status = false;
            resdata.message = 'Wrong user name or password';
            res.jsonp(resdata);
        }
    });

    // var query = "SELECT users.user_Id, users.user_Type FROM users WHERE email_Id = '" + email + "' AND user_Password ='" + password + "'";
    // connection.query(query, function(error, user, fields) {
    //     if (error == null) {
    //         if (user.length > 0) {
    //             console.log("user", user);
    //             getLoginDetails(user[0])
    //         } else {
    //             var resdata = {
    //                 record: '',
    //                 status: false,
    //                 message: 'Wrong user name or password.'
    //             };
    //         }
    //     } else {
    //         var resdata = {
    //             record: '',
    //             status: false,
    //             message: 'Server not responding.'
    //         };
    //         res.jsonp(resdata);
    //     }
    // });

    // function getLoginDetails(user){
    //     console.log("user.user_Id", user.user_Id);
    // }
}