"use strict";
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/calender');
var Schema = mongoose.Schema;

var categorySchema = new mongoose.Schema({
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
});

exports.Category = db.model('Category', categorySchema);

