/**
 * Module dependencies.
 */

var api = require('lib/db-api');
var accepts = require('lib/accepts');
var express = require('express');
var log = require('debug')('civicstack:country');
var utils = require('lib/utils');
var admin = utils.admin;
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

  api.country.all(function(err, countries) {
    if (err) return handleError(err, req, res);

    log('Serving countries %j', pluck(countries, "id"));

    var keys = 'id name';

    res.json(countries.map(expose(keys)));
  });
});

app.get('/countries/:id', function (req, res) {
  log('Request GET /countries/%s', req.params.id);

  api.country.get(req.params.id, function (err, country) {
    if (err) return handleError(err, req, res);
    if (!country) return res.send(404);

    log('Serving country %s', country.id);

    res.json(country.toJSON());
  });
});

app.post('/countries/create', admin, function (req, res) {
  log('Request POST /countries/create %j', req.body);

  api.country.create(req.body, function (err, country) {
    if (err) return handleError(err, req, res);

    log('Serving country %s', country.id);

    res.json(country.toJSON());
  });
});

app.post('/countries/:id', admin, function (req, res) {
  log('Request POST /countries/%s %j', req.params.id, req.body);

  api.country.update(req.body, function (err, country) {
    if (err) return handleError(err, req, res);

    log('Serving country %s', country.id);

    res.json(country.toJSON());
  });
});
