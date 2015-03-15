'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var async = require('async');
var hbs = require('express-hbs');



// init express
var app = express();

// set logging
app.use(function(req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
});

var appLocation = '../app';
if (process.argv.length > 2 && process.argv[2] == 'dist') {
  appLocation = '../dist';
}
console.log('App location is ', appLocation);

app.use(express.static(path.join(__dirname, appLocation)));
/*app.get('/', function(req, res) {
	res.sendfile(path.join(__dirname, '../app/index.html'));
});*/

// start server
var port = 8085;
http.createServer(app).listen(port, function() {
  console.log('Express App started! on port ' + 8085);
});
