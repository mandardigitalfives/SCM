var express = require('express');
var http = require('http');
var CRUD = require('mysql-crud');
var env = require('./environment');
var connection = env.Dbconnection;
var trucklistCRUD = CRUD(connection, 'authenticateUser');

exports.getTrucklist = function(req, res) {
    console.log("req.body", req.body);
    trucklistCRUD.load({
        'refUid': req.body.refuid,
        'type': req.body.type
    }, function(error, result) {
        if (error) {
            responsedata = {
                status: false,
                record: result,
                message: 'Something went wrong.'
            }
            res.jsonp(responsedata);
        } else {
            if (result.length > 0) {
                responsedata = {
                    status: true,
                    record: result,
                    message: ''
                }
                res.jsonp(responsedata);
            } else {
                responsedata = {
                    status: false,
                    record: '',
                    message: 'No Record Found'
                }
                res.jsonp(responsedata);
            }
        }
    });
}
