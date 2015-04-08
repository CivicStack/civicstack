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

var all = ['id title logo backgroundColor description technology',
            'organization github website twitter license team',
            'contact workingAt partnership comments tags approved tagids'].join(' ');

app.get('/applications', function (req, res) {
  log('Request /applications');

  api.application.all(function(err, applications) {
    if (err) return _handleError(err, req, res);

    log('Serving applications %j', pluck(applications, "id"));

    res.json(applications.map(expose(all)));
  });
});

app.get('/applications/:id', function (req, res) {
  log('Request GET /application/%s', req.params.id);

  api.application.get(req.params.id, function (err, application) {
    if (err) return _handleError(err, req, res);
    if (!application) return res.send(404);

    log('Serving application %s', application.id);

    res.json(expose(all)(application.toJSON()));
  });
});

app.post('/applications/create', function (req, res) {
  log('Request POST /applications/create %j', req.body);

  api.application.create(req.body, function (err, application) {
    if (err) return _handleError(err, req, res);

    log('Serving application %s', application.id);

    res.json(expose(all)(application.toJSON()));
  });
});

app.post('/applications/:id', function (req, res) {
  log('Request POST /applications/%s %j', req.params.id, req.body);

  api.application.update(req.body, function (err, app) {
    if (err) return _handleError(err, req, res);

    log('Serving application %s', app.id);

    res.json(expose(all)(app.toJSON()));
  });
});
