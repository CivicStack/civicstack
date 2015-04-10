/**
 * Module dependencies.
 */

var api = require('lib/db-api');
var accepts = require('lib/accepts');
var express = require('express');
var log = require('debug')('civicstack:license');
var utils = require('lib/utils');
var pluck = utils.pluck;
var expose = utils.expose;
var handleError = utils.handleError;

var app = module.exports = express();

/**
 * Limit request to json format only
 */

app.use(accepts('application/json'));

app.get('/licenses', function (req, res) {
  log('Request /licenses');

  api.license.all(function(err, licenses) {
    if (err) return handleError(err, req, res);

    log('Serving licenses %j', pluck(licenses, "id"));

    var keys = 'id name';

    res.json(licenses.map(expose(keys)));
  });
});