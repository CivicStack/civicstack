/**
 * Module dependencies.
 */

var api = require('lib/db-api');
var accepts = require('lib/accepts');
var express = require('express');
var log = require('debug')('civicstack:country');
var utils = require('lib/utils');
var pluck = utils.pluck;
var expose = utils.expose;
var handleError = utils.handleError;

var app = module.exports = express();

/**
 * Limit request to json format only
 */

app.use(accepts('application/json'));

app.get('/categories', function (req, res) {
  log('Request /categories');

  api.category.all(function(err, categories) {
    if (err) return handleError(err, req, res);

    log('Serving categories %j', pluck(categories, 'id'));

    var keys = 'id name';

    res.json(categories.map(expose(keys)));
  });
});