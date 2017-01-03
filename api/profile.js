var express = require('express');
var http = require('http');
var CRUD = require('mysql-crud');
var env =require('./environment');
var connection = env.Dbconnection;
var getUserDetails = CRUD(connection, 'authenticateUser');

exports.getProfile = function(req ,res) {
	
    getUserDetails.load({
      'Uid' : req.body.Uid,
     },function(error, result) {
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