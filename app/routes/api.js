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
    responder.handleErrors(err, err.code, res, 'json');
  }

  router.get('/:model', function list(req, res) {
    var limit = req.query.limit ? req.query.limit : 10;
    var offset = req.query.offset ? req.query.offset : 0;
    model.list(req.params.model, limit, offset,
      function(err, entities, cursor) {
        if (err) { return handleRpcError(err, res); }
        res.json({
          items: entities,
          nextPageToken: cursor
        });
      });
  });


  router.post('/:model', function insert(req, res) {
    model.create(req.params.model, req.body, function(err, entity) {
      if (err) { return handleRpcError(err, res); }
      responder.respond(req, res, entity);
    });
  });


  router.get('/:model/:id', function get(req, res) {
    model.read(req.params.model, req.params.id, function(err, entity) {
      if (err) { return handleRpcError(err, res);}
      responder.respond(req, res, entity);
    });
  });


  router.put('/:model/:id', function update(req, res) {
    model.update(req.params.model, req.params.id, req.body, function(err, entity) {
      if (err) { return handleRpcError(err, res); }
      responder.respond(req, res, entity);
    });
  });


  router.delete('/:model/:id', function _delete(req, res) {
    model.delete(req.params.model, req.params.id, function(err) {
      if (err) { return handleRpcError(err, res); }
      responder.respond(req, res, {});
    });
  });

  return router;

};
