'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var async = require('async');
var hbs = require('express-hbs');




// init express
var app = express();

app.configure(function(){
    app.set('view engine', 'handlebars');
    app.set('views', __dirname + '../src/js/views');
});

// set logging
app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});

// mount static
app.use(express.static( path.join( __dirname, '../') ));


// route index.html
app.get('/', function(req, res){
  res.sendfile( path.join( __dirname, '../src/index.html' ) );
});

// start server
var port = 8085;
http.createServer(app).listen(port, function(){
    console.log('Express App started! on port ' + 8085);
});
