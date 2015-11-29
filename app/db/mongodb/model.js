'use strict';

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var config = require('../../../config/' + process.env.NODE_ENV);

module.exports = function(config) {
  var url = 'mongodb://'+
    config.mongo.user+':'+
    config.mongo.password+'@'+
    config.mongo.domain+':'+
    config.mongo.port+'/'+
    config.mongo.db;

  var collection;


  // [START translate]
  function fromMongo(item) {
    if (item.length) { item = item.pop(); }
    item.id = item._id;
    delete item._id;
    return item;
  }


  function toMongo(item) {
    delete item.id;
    return item;
  }
  // [END translate]


  function getCollection(model, cb) {
    if (collection) {
      setImmediate(function() { cb(null, collection); });
      return;
    }
    MongoClient.connect(url, function(err, db) {
      if (err) {
        console.log(err);
        return cb(err);
      }
      collection = db.collection(model);
      cb(null, collection);
    });
  }


  // [START list]
  function list(model, limit, token, cb) {
    token = token ? parseInt(token, 10) : 0;
    getCollection(model, function(err, collection) {
      if (err) { return cb(err); }
      collection.find({})
        .skip(token)
        .limit(limit)
        .toArray(function(err, results) {
          if (err) { return cb(err); }
          var hasMore =
            results.length === limit ? token + results.length : false;
          cb(null, results.map(fromMongo), hasMore);
        });
    });
  }
  // [END list]


  // [START create]
  function create(model, data, cb) {
    getCollection(model, function(err, collection) {
      if (err) { return cb(err); }
      collection.insert(data, {w: 1}, function(err, result) {
        if (err) { return cb(err); }
        var item = fromMongo(result.ops);
        cb(null, item);
      });
    });
  }
  // [END create]


  function read(model, id, cb) {
    getCollection(model, function(err, collection) {
      if (err) { return cb(err); }
      collection.findOne({
        _id: new ObjectID(id)
      }, function(err, result) {
        if (err) { return cb(err); }
        if (!result) {
          return cb({
            code: 404,
            message: 'Not found'
          });
        }
        cb(null, fromMongo(result));
      });
    });
  }


  // [START update]
  function update(model, id, data, cb) {
    getCollection(model, function(err, collection) {
      if (err) { return cb(err); }
      collection.update({
          _id: new ObjectID(id)
        }, {
          '$set': toMongo(data)
        },
        {w: 1},
        function(err) {
          if (err) { return cb(err); }
          return read(model, id, cb);
        }
      );
    });
  }
  // [END update]


  function _delete(model, id, cb) {
    getCollection(function(err, collection) {
      if (err) { return cb(err); }
      collection.remove({
        _id: new ObjectID(id)
      }, cb);
    });
  }

  return {
    create: create,
    read: read,
    update: update,
    delete: _delete,
    list: list
  };

};
