/**
 * Module dependencies.
 */

var api = require('lib/db-api');
var accepts = require('lib/accepts');
var express = require('express');
var log = require('debug')('civicstack:tag');
var utils = require('lib/utils');
var pluck = utils.pluck;
var expose = utils.expose;
var handleError = utils.handleError;

var app = module.exports = express();

/**
 * Limit request to json format only
 */

app.use(accepts('application/json'));

app.get('/countries', function (req, res) {
  log('Request /countries');

  api.tag.all(function(err, countries) {
    if (err) return handleError(err, req, res);

    log('Serving countries %j', pluck(countries, "id"));

    var keys = 'id name';

    res.json(countries.map(expose(keys)));
  });
});