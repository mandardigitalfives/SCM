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
