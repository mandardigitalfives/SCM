var express = require('express');
var http = require('http');
var CRUD = require('mysql-crud');
var env = require('./environment');
var common_API = require('./commonAPI');
var connection = env.Dbconnection;
var jobsCRUD = CRUD(connection, 'jobs');

exports.addjob = function(req, res) {
    console.log("req.body", req.body);
    jobsCRUD.create({
        'job_Title': req.body.job_title,
        'job_Description' : req.body.job_description,
        'job_CreatedBy' : req.body.jobCreatedBy,
        'job_DeliveryAddress' : req.body.job_DeliveryAddress
    }, function(error, result) {
        if (result) {
            responsedata = {
                status: true,
                record: result,
                todo_id: result.insertId,
                message: 'Todos Inserted successfully'
            }
            res.jsonp(responsedata);
        } else {
            responsedata = {
                status: false,
                record: result,
                message: 'Todos Failed Insert'
            }
            res.jsonp(responsedata);
        }
    });
}


exports.getJob = function(req, res) {
    console.log(req.body);
       var user_Id = req.body.user_Id;

    var query = "SELECT * FROM jobs WHERE job_CreatedBy = "+user_Id+"";
    console.log(query);

    connection.query(query, function(error, result, fields) {
        if (error == null) {
            if (result.length > 0) {
                console.log(result);
                var resdata = {
                        status : true,
                        record : result,
                        message : 'Successfully welcome'
                    }
                    res.jsonp(resdata); 
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
