'use strict';

var mongoose = require('mongoose');
var S = require('string');
var ParamException = require('../exception/ParamException');

var BaseSchema = {};

BaseSchema.constructor = function (modelName, schema, mongodbUrl) {
    if (S(modelName).isEmpty()) {
        throw ParamException('modelName is empty');
    } else if (S(schema).isEmpty() || S(JSON.stringify(schema)).isEmpty()) {
        throw ParamException('schema is empty');
    } else {
        this._model = modelName;
        this._schema = schema;
        this._url = mongodbUrl || 'mongodb://localhost/calendar';
    }
    return this;
};

/**
 * Connect to MongoDB with Mongoose
 * @private
 */
BaseSchema._connect = function () {
    if (!this._db || this._db.connection.readyState === 0)
        this._db = mongoose.connect(this._url);
};

/**
 * Close connection with MongoDB
 * @private
 */
BaseSchema._disconnect = function () {
    if (this._db && this._db.connection.readyState === 1)
        this._db.disconnect();
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
 * Save model
 * @param schemaData object
 */
BaseSchema.save = function (schemaData) {
    if (!this.schema) {
        this.schema = new mongoose.Schema(this._schema);
        mongoose.model(this._model, this.schema);
    }

    this._connect();
    var Model = mongoose.model(this._model);
    var model = new Model();
    for (var key in schemaData) {
        if (!schemaData.hasOwnProperty(key)) continue;
        model[key] = schemaData[key];
    }
    var self = this;
    model.save(function (err) {
        if (err) throw err;
        self._disconnect();
    });
};

module.exports = BaseSchema;
