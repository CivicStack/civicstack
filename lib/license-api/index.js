/**
 * Module dependencies.
 */

var api = require('lib/db-api');
var accepts = require('lib/accepts');
var express = require('express');
var log = require('debug')('civicstack:license');
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

app.get('/licenses', function (req, res) {
  log('Request /licenses');

  api.license.all(function(err, licenses) {
    if (err) return handleError(err, req, res);

    log('Serving licenses %j', pluck(licenses, "id"));

    var keys = 'id name';

    res.json(licenses.map(expose(keys)));
  });
});

app.get('/licenses/:id', function (req, res) {
  log('Request GET /licenses/%s', req.params.id);

  api.license.get(req.params.id, function (err, license) {
    if (err) return handleError(err, req, res);
    if (!license) return res.send(404);

    log('Serving license %s', license.id);

    res.json(license.toJSON());
  });
});

app.post('/licenses/create', admin, function (req, res) {
  log('Request POST /licenses/create %j', req.body);

  api.license.create(req.body, function (err, license) {
    if (err) return handleError(err, req, res);

    log('Serving license %s', license.id);

    res.json(license.toJSON());
  });
});

app.post('/licenses/:id', admin, function (req, res) {
  log('Request POST /licenses/%s %j', req.params.id, req.body);

  api.license.update(req.body, function (err, license) {
    if (err) return handleError(err, req, res);

    log('Serving license %s', license.id);

    res.json(license.toJSON());
  });
});

app.delete('/licenses/:id', admin, function (req, res) {
  log('Request DEL /licenses/%s %j', req.params.id, req.body);

  api.license.remove(req.params.id, function (err, id) {
    if (err) return handleError(err, req, res);

    log('Serving license %s', id.id);

    res.sendStatus(200);
  });
});
