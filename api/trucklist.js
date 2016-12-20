var express = require('express');
var http = require('http');
var CRUD = require('mysql-crud');
var env =require('./environment');
var connection = env.Dbconnection;
var trucklistCRUD = CRUD(connection, 'JobListAgency');

exports.getTrucklist = function(req ,res) {
   
}