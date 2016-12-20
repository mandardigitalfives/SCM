var express = require('express');
var http = require('http');
var CRUD = require('mysql-crud');
var env =require('./environment');
var connection = env.Dbconnection;
var trucklistCRUD = CRUD(connection, 'authenticateUser');

exports.getManager = function(req ,res) {
	console.log(req.body);
   /*authenticateUser.find().toArray(function(err,result){

   	if(err){
   		var resdata ={
   			status : 0;
   			message : err;
   		}
   		res.jsonp(resdata)
   	}else{
   		console.log(result);
   		res.jsonp(result);
   	}
   })*/
}