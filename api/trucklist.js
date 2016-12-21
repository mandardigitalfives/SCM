var express = require('express');
var http = require('http');
var CRUD = require('mysql-crud');
var env =require('./environment');
var connection = env.Dbconnection;
var trucklistCRUD = CRUD(connection, 'authenticateUser');

exports.getTrucklist = function(req ,res) {
	console.log(req.body);
    trucklistCRUD.load({
      'refUid':req.body.refuid,
      'type' : req.body.type
     },function(error, result) {
       if (result) {
         responsedata = {
           status: true,
           record: result,
           message: 'Todos List'
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