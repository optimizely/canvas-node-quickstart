'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var authService = require('../services/auth');
var url = require('url');
var responder = require('../services/responder');


module.exports = function(model) {
	// Check for existance of model before using it since the database is optional
	var router = express.Router();

  router.use(bodyParser.urlencoded({extended: false}));

	router.get('/',function(req, res) {
		var data = {
			first: 'John',
			last: 'Snow'
		}
		responder.respond(req,res,data,'index.swig');
	});

	return router;
}
