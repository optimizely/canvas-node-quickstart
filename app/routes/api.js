'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var authService = require('../services/auth');
var url = require('url');
var responder = require('../services/responder');

module.exports = function (model) {

  var router = express.Router();

  router.use(bodyParser.json());


  function handleRpcError(err, res) {
    if (err.code == 404) return res.status(404);
    res.status(500).json({
      message: err.message,
      internalCode: err.code
    });
  }

  router.get('/', function (req, res) {
		var data = {
			first: 'John',
			last: 'Snow'
		}
		responder.respond(req,res,data);
	});

  return router;

};
