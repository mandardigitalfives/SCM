var express = require('express');
var http = require('http');
var CRUD = require('mysql-crud');
var env =require('./environment');
var connection = env.Dbconnection;
var managerlistCRUD = CRUD(connection, 'authenticateUser');

exports.getManager = function(req ,res) {
	console.log(req.body);
    managerlistCRUD.load({
      'refUid':req.body.refUid,
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