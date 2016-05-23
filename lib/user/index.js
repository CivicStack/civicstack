/**
 * Module dependencies.
 */

var express = require('express');
var mongoose = require('mongoose');
var app = module.exports = express();
var expose = require('lib/utils').expose;
var disqus = require('./disqus');

app.get("/users/me", disqus, function(req, res, next) {
  return res.json(req.isAuthenticated()
    ? expose('id firstName lastName fullName avatar admin disqus')(req.user)
    : {});
});
