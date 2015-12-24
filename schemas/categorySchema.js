'use strict';

var schema = {
  id: String,
  name: String,
  icon: String,
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
};
var CategorySchema = require('./basicSchema').constructor('Category', schema);
exports.Category = CategorySchema;
