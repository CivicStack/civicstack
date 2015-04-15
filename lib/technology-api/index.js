/**
 * Module dependencies.
 */

var api = require('lib/db-api');
var accepts = require('lib/accepts');
var express = require('express');
var log = require('debug')('civicstack:technology');
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

app.get('/technologies', function (req, res) {
  log('Request /technologies');

  api.technology.all(function(err, technologies) {
    if (err) return handleError(err, req, res);

    log('Serving technologies %j', pluck(technologies, "id"));

    var keys = 'id name';

    res.json(technologies.map(expose(keys)));
  });
});

app.get('/technologies/:id', function (req, res) {
  log('Request GET /technologies/%s', req.params.id);

  api.technology.get(req.params.id, function (err, technology) {
    if (err) return handleError(err, req, res);
    if (!technology) return res.send(404);

    log('Serving technology %s', technology.id);

    res.json(technology.toJSON());
  });
});

app.post('/technologies/create', admin, function (req, res) {
  log('Request POST /technologies/create %j', req.body);

  api.technology.create(req.body, function (err, technology) {
    if (err) return handleError(err, req, res);

    log('Serving technology %s', technology.id);

    res.json(technology.toJSON());
  });
});

app.post('/technologies/:id', admin, function (req, res) {
  log('Request POST /technologies/%s %j', req.params.id, req.body);

  api.technology.update(req.body, function (err, technology) {
    if (err) return handleError(err, req, res);

    log('Serving technology %s', technology.id);

    res.json(technology.toJSON());
  });
});

app.delete('/technologies/:id', admin, function (req, res) {
  log('Request DEL /technologies/%s %j', req.params.id, req.body);

  api.technology.remove(req.params.id, function (err, id) {
    if (err) return handleError(err, req, res);

    log('Deleted technology %s', id.id);

    res.sendStatus(200);
  });
});

