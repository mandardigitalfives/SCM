var express = require('express');
var http = require('http');
var CRUD = require('mysql-crud');
var env = require('./environment');
var connection = env.Dbconnection;


exports.getProfile = function(req, res) {

    console.log("profile", req.body);

    if (req.body.user_type == "manager") {
        var getUserDetails = CRUD(connection, 'managers');
    } else if (req.body.user_type == "owner") {
        var getUserDetails = CRUD(connection, 'owners');
    } else if (req.body.user_type == "dirver") {
        var getUserDetails = CRUD(connection, 'dirvers');
    }

    getUserDetails.load({
        'user_Id': req.body.Uid,
    }, function(error, result) {
        if (result) {
            responsedata = {
                status: true,
                record: result[0],
                message: 'User Details'
            }
            res.jsonp(responsedata);
        } else {
            responsedata = {
                status: false,
                record: result,
                message: 'Something went wrong.'
            }
            res.jsonp(responsedata);
        }
    });
}

exports.updateProfile = function(req, res) {
    console.log(req.body);

    if (req.body.user_type == "manager") {
        var getUserDetails = CRUD(connection, 'managers');
    } else if (req.body.user_type == "owner") {
        var getUserDetails = CRUD(connection, 'owners');
    } else if (req.body.user_type == "dirver") {
        var getUserDetails = CRUD(connection, 'dirvers');
    }

    getUserDetails.update({
        'user_Id': req.body.Uid
    }, {
        "user_FirstName": req.body.firstname,
        "user_LastName": req.body.lastname
    }, function(error, result) {
        console.log("Profile.js_39", error);
        console.log("Profile.js_49", result);
        if (result) {
            responsedata = {
                status: true,
                record: result,
                message: 'Todos Updated successfully'
            }
            res.jsonp(responsedata);
        } else {
            responsedata = {
                status: false,
                record: result,
                message: 'Todos Failed to Update'
            }
            res.jsonp(responsedata);
        }
    });
}
