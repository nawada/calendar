'use strict';

const express = require('express');
const router = express.Router();
const EventService = require('../services/eventService');

/* Get Events */
router.get('/', function (req, res) {
  const service = new EventService();
  service.fetchList().then(function (result) {
    const resObject = {};
    resObject['events'] = result;
    res.status(200).json(resObject);
  },
  function (err) {
    console.log(err);
    res.status(400).end('Get Events Failed');
  });
});

module.exports = router;

