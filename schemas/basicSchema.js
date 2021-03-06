'use strict';

var mongoose = require('mongoose');
var S = require('string');
var ParamException = require('../exception/ParamException');

var STATE = {
  disconnected: 0,
  connected: 1,
  connecting: 2,
  disconnecting: 3
};

var BaseSchema = {};

/**
 * Constructor
 * @param modelName
 * @param schema
 * @param mongodbUrl
 * @returns {BaseSchema}
 */
BaseSchema.constructor = function (modelName, schema, mongodbUrl) {
  if (S(modelName).isEmpty()) {
    throw ParamException('modelName is empty');
  } else if (S(schema).isEmpty() || S(JSON.stringify(schema)).isEmpty()) {
    throw ParamException('schema is empty');
  } else {
    this._model = modelName;
    this._schema = schema;
    this._url = mongodbUrl || 'mongodb://localhost/calendar';
    this._db = mongoose.createConnection();
  }
  return this;
};

/**
 * Connect to MongoDB with Mongoose
 * @private
 */
BaseSchema._connect = function () {
  if (this._db.readyState === STATE.disconnected)
    this._db.open(this._url);
};

/**
 * Close connection with MongoDB
 * @private
 */
BaseSchema._disconnect = function () {
  if (this._db.readyState === STATE.connected)
    this._db.close();
};

/**
 * Find model items by conditions
 * @param conditions
 * @param callback
 */
BaseSchema.find = function (conditions, callback) {
  var self = this;
  this._connect();
  if (!this.schema) {
    this.schema = new mongoose.Schema(this._schema);
  }
  this._db.model(this._model, this.schema).find(conditions, function (err, datas) {
    if (callback) callback(err, datas);
    self._disconnect();
  })
};

/**
 * Save model item
 * @param schemaData object
 * @param callback
 */
BaseSchema.save = function (schemaData, callback) {
  if (!this.schema) {
    this.schema = new mongoose.Schema(this._schema);
    mongoose.model(this._model, this.schema);
  }

  this._connect();
  var Model = this._db.model(this._model);
  var model = new Model();
  for (var key in schemaData) {
    if (!schemaData.hasOwnProperty(key)) continue;
    model[key] = schemaData[key];
  }
  var self = this;
  model.save(function (err) {
    if (err) throw err;
    if (callback) callback(err, model);
    self._disconnect();
  });
};

/**
 * Update model item
 * @param query object
 * @param schemaData object
 * @param callback
 */
BaseSchema.update = function (query, schemaData, callback) {
  if (!this.schema) {
    this.schema = new mongoose.Schema(this._schema);
    mongoose.model(this._model, this.schema);
  }

  this._connect();
  const model = this._db.model(this._model, this.schema);
  const set = {};
  for (var key in schemaData) {
    if (!schemaData.hasOwnProperty(key)) continue;
    set[key] = schemaData[key];
  }
  const self = this;
  model.update(query, {$set: set}, {upsert: false}, function (err) {
    if (callback) callback(err);
    self._disconnect();
  })
};

/**
 * Remove model item
 * @param query object
 * @param callback
 */
BaseSchema.remove = function (query, callback) {
  if (!this.schema) {
    this.schema = new mongoose.Schema(this._schema);
    mongoose.model(this._model, this.schema);
  }

  this._connect();
  const model = this._db.model(this._model, this.schema);
  const self = this;
  model.remove(query, function (err) {
    if (callback) callback(err);
    self._disconnect();
  })
};

module.exports = BaseSchema;
