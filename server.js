// var env = process.env.NODE_ENV || 'dev';
var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var io = require( "./socket" );
var md5 = require('MD5');
var http = require('http').Server(app)

// =======================
// configuration =========
// =======================

// if(env == 'uat') {
// 	var port = 8080;
// }else{
// 	var port = process.env.PORT || 8000;
// }

var port = 9999;

// use body parser so we can get info from POST and/or URL parameters
/*
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
*/
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json({
  limit: '50mb'
}));
// app.use(bodyParser.urlencoded({
//   limit: '50mb'
// }));

// use morgan to log requests to the console
app.use('/', express.static(__dirname + '/public'));
app.use('/api', express.static(__dirname + '/api'));
app.use('/mobile', express.static(__dirname + '/SCM/www'));
app.use('/apidoc', express.static(__dirname + '/apidoc'));

var userlogin = require('./api/userlogin.js');
var todos = require('./api/todos.js');
var device_register = require('./api/device_register.js');
var sendpushnotification = require('./api/sendpushnotification.js');


app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  next();
});


app.post('/api/login', userlogin.login);
app.post('/api/addtodos',todos.addtodos);
app.post('/api/gettodos',todos.gettodos);
app.post('/api/gettododetails',todos.gettododetails);
app.post('/api/updatetodos',todos.updatetodos);
app.post('/api/deletetodo',todos.deletetodo);
app.post('/api/deviceregister',device_register.deviceregister);
app.post('/api/signup',userlogin.signup);
// =======================
// routes ================
// =======================
// basic route
// for login
// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at port : ' + port);

io.attach( http );