'use strict';

var extend = require('lodash').assign;
var mysql = require('mysql');
var config = require('../../config/' + process.env.NODE_ENV);


module.exports = function(config) {

  function getConnection() {
    return mysql.createConnection(extend({
      database: config.mysql.dbname
    }, config.mysql.auth));
  }

  // [START list]
  function list(table, key, id, limit, token, cb) {
    token = token ? parseInt(token, 10) : 0;
    var connection = getConnection();
    connection.query(
      'SELECT * FROM ? WHERE ? = ? LIMIT ? OFFSET ?', [table, key, id, limit, token],
      function(err, results) {
        if (err) return cb(err);
        cb(null, results, results.length === limit ? token + results.length : false);
      }
    );
    connection.end();
  }
  // [END list]


  // [START create]
  function create(table, data, cb) {
    var connection = getConnection();
    connection.query('INSERT INTO ? SET ?', [table, data], function(err, res) {
      if (err) return cb(err);
      read(res.insertId, cb);
    });
    connection.end();
  }
  // [END create]


  function read(table, id, cb) {
    var connection = getConnection();
    connection.query('SELECT * FROM ? WHERE `id` = ?', [table, id], function(err, results) {
      if (err) return cb(err);
      if (!results.length) return cb({
        code: 404,
        message: 'Not found'
      });
      cb(null, results[0]);
    });
    connection.end();
  }


  // [START update]
  function update(table, id, data, cb) {
    var connection = getConnection();
    connection.query('UPDATE ? SET ? WHERE `id` = ?', [table, data, id], function(err) {
      if (err) return cb(err);
      read(id, cb);
    });
    connection.end();
  }
  // [END update]


  function _delete(table, id, cb) {
    var connection = getConnection();
    connection.query('DELETE FROM ? WHERE `id` = ?', [table, id], cb);
    connection.end();
  }


  return {
    createSchema: createSchema,
    list: list,
    create: create,
    read: read,
    update: update,
    delete: _delete
  };

};


if (!module.parent) {
  var prompt = require('prompt');
  prompt.start();

  console.log(
    'Running this script directly will allow you to initialize your mysql database.\n' +
    'This script will not modify any existing tables.\n');
  
  createSchema();
}


function createSchema() {
  var connection = mysql.createConnection(extend({
    multipleStatements: true
  }, config.mysql.auth));

  connection.query(
    'CREATE DATABASE IF NOT EXISTS `'+config.mysql.dbname+'` DEFAULT CHARACTER SET = \'utf8\' DEFAULT COLLATE \'utf8_general_ci\'; ' +
    'USE `'+config.mysql.dbname+'`; ' +
    'CREATE TABLE IF NOT EXISTS `'+config.mysql.dbname+'`.`experiments` ( ' +
    '`id` INT UNSIGNED NOT NULL AUTO_INCREMENT, ' +
    '`account_id` INT NOT NULL, ' +
    '`project_id` INT NULL, ' +
    '`title` VARCHAR(255) NULL, ' +
    '`created_date` VARCHAR(255) NULL, ' +
    '`updated_date` VARCHAR(255) NULL, ' +
    'PRIMARY KEY (`id`));',
    function(err, rows) {
      if (err) throw err;
      console.log('Successfully created schema');
      connection.end();
    }
  );
}
