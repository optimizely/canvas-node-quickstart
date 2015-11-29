'use strict';

var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var config = require('./config/' + process.env.NODE_ENV);
var swig = require('swig');
var authService = require('./app/services/auth');
var responder = require('./app/services/responder');

var app = express();
app.use(cookieParser());
app.disable('etag');
app.engine('swig', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'swig');
app.set('view cache', false);
swig.setDefaults({ cache: false });
app.set('trust proxy', true);

var model = require('./app/db/'+config.dataBackend+'/model')(config);
app.use('/', require('./app/routes/main')(model));
app.use('/api', require('./app/routes/api')(model));

app.use(express.static('public'));


// Basic error handler
app.use(function(err, req, res, next) {
	console.error(err.stack);
	responder.handleErrors(err,res,'json');
});

var server = app.listen(config.port || 8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});
