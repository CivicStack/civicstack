/**
 * Module dependencies.
 */

var express = require('express');
var mongoose = require('mongoose');
var app = module.exports = express();
var expose = require('lib/utils').expose;

app.get("/users/me", function(req, res, next) {
  if (req.isAuthenticated()) return res.json(expose('id firstName lastName fullName avatar admin')(req.user));

  return res.json({});
});
