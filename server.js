var express = require('express'), path = require('path');
var app = express();
// var http = require('http').createServer(app);
//var io = require('socket.io')(http);
var http = require('http').Server(app)
var io = require( "./socket" );
var md5 = require('MD5');


//var ipn = require('paypal-ipn');

var bodyParser = require('body-parser');

app.use(bodyParser({uploadDir:'uploads', limit: '90mb' }));

//app.use(methodOverride());

var Busboy = require('connect-busboy');
var fs = require('fs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var userlogin = require('./api/userlogin.js');
var todos = require('./api/todos.js');
var device_register = require('./api/device_register.js');
var sendpushnotification = require('./api/sendpushnotification.js');

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
 });

app.use('/', express.static(__dirname + '/public'));
app.use('/api', express.static(__dirname + '/api'));
app.use('/mobile', express.static(__dirname + '/mobile/www'));


app.post('/api/login', userlogin.login);
app.post('/api/addtodos',todos.addtodos);
app.post('/api/gettodos',todos.gettodos);
app.post('/api/gettododetails',todos.gettododetails);
app.post('/api/updatetodos',todos.updatetodos);
app.post('/api/deletetodo',todos.deletetodo);
app.post('/api/deviceregister',device_register.deviceregister);
app.post('/api/signup',userlogin.signup);

http.listen( 9999, function(){
   console.log('Express server listening on port ' + http.address().port);
});

io.attach( http );