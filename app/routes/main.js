'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var authService = require('../services/auth');
var url = require('url');
var responder = require('../services/responder');


module.exports = function(model) {

	var router = express.Router();

  router.use(bodyParser.urlencoded({extended: false}));

  function handleRpcError(err, res) {
    res.status(err.code || 500)
    .json({
        error: true
    });
  }


	router.get('/', function(req, res) {
		var data = {
			first: 'John',
			last: 'Snow'
		}
		responder.respond(req,res,data,'index.swig');
	});

	return router;
}
