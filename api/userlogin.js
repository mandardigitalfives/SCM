var express = require('express');
var http = require('http');
var CRUD = require('mysql-crud');
var env = require('./environment');
var connection = env.Dbconnection;
var userCRUD = CRUD(connection, 'authenticateUser');

exports.login = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    console.log(email, password);
    userCRUD.load({
        UserId: email,
        Password: password
    }, function(err, val) {
        var resdata = {
            record: '',
            status: false,
            message: 'Something get wrong please try after some time.'
        };
        if (val.length > 0) {
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
}
