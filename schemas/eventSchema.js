'use strict';

var schema = {
  id: String,
  name: String,
  icon: String,
  category: String,
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
};
var EventSchema = require('./basicSchema').constructor('Event', schema);
exports.Event = EventSchema;
