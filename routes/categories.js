'use strict';

const express = require('express');
const router = express.Router();
const CategoryService = require('../services/categoryService');

/* Get Categories */
router.get('/', function (req, res) {
  const service = new CategoryService();
  service.fetchList().then(function (result) {
    const resObject = {};
    resObject['categories'] = result;
    res.status(200).json(resObject);
  },
  function (err) {
    console.log(err);
    res.status(400).end('Get Categories Failed');
  });
});

/* Post Category */
router.post('/', function (req, res) {
  // TODO: 認証
  const service = new CategoryService();
  service.add(req.body).then(function (result) {
    const resObject = {};
    resObject['gen_res'] = new Array(result);
    res.status(201).json(resObject);
  },
  function (err) {
    console.log(err);
    res.status(400).end('Post Category Failed');
  });
});

module.exports = router;
