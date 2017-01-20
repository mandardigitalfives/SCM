var express = require('express');
var router  = express.Router();
var io      = require( "../socket" )
var mysql   = require('mysql');
var async = require("async");



// define the home page route
router.get('/', function(req, res) {

  dbConnection.query( "query", function( error , result , fields ){

    if(result.length > 0 ){
      responsedata = {
            errcode:1,
            record : result
        }
    } else {
      responsedata = {
            errcode:0,
            message:'Try later.'
        }
    }
  	res.jsonp( responsedata );

  });
  /*activityCrud.load(function(){
  	res.send('bid List');
  });*/
});
module.exports = router;