"use strict";
// default.route.js
var express = require("express"); 
var router = express.Router(); 

module.exports = router;

router.route('/')
    .get(function (req, res) {
  res.send('Hello World!');
});

