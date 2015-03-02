/**
 * Module dependencies.
 */

var api = require('lib/db-api');
var accepts = require('lib/accepts');
var express = require('express');
var log = require('debug')('civicstack:application');
var utils = require('lib/utils');
var pluck = utils.pluck;
var expose = utils.expose;

var app = module.exports = express();

/**
 * Limit request to json format only
 */

app.use(accepts('application/json'));

app.get('/applications', function (req, res) {
  log('Request /applications');

  api.application.all(function(err, applications) {
    if (err) return _handleError(err, req, res);

    log('Serving applications %j', pluck(applications, "id"));

    var keys = [
      'id name logo backgroundColor description technology',
      'organization github website twitter license team',
      'contact workingAt partnership comments approved'
    ].join(' ');

    res.json(applications.map(expose(keys)));
  });
});
