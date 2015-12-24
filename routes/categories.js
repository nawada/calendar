'use strict';

var express = require('express');
var router = express.Router();
var categoryService = require('../services/categoryService');

/* Get Categories */
router.get('/', function (req, res) {
  categoryService.fetchList().then(function (result) {
    var resObject = {};
    resObject['categories'] = result;
    res.status(201).json(resObject);
  },
  function (err) {
    console.log(err);
    res.status(400).end('Get Categories Failed');
  });
});

module.exports = router;
