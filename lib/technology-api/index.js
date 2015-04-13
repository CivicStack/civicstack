/**
 * Module dependencies.
 */

var api = require('lib/db-api');
var accepts = require('lib/accepts');
var express = require('express');
var log = require('debug')('civicstack:technology');
var utils = require('lib/utils');
var pluck = utils.pluck;
var expose = utils.expose;
var handleError = utils.handleError;

var app = module.exports = express();

/**
 * Limit request to json format only
 */

app.use(accepts('application/json'));

app.get('/technologies', function (req, res) {
  log('Request /technologies');

  api.technology.all(function(err, technologies) {
    if (err) return handleError(err, req, res);

    log('Serving technologies %j', pluck(technologies, "id"));

    var keys = 'id name';

    res.json(technologies.map(expose(keys)));
  });
});
