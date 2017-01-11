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

exports.updateProfile = function(req,res){
  console.log(req.body);
  getUserDetails.update({
    'Uid' : req.body.Uid
  },{
    "Name" : req.body.firstname,
    "last_name" : req.body.lastname
  },function(error,result){
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