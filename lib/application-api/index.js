/**
 * Module dependencies.
 */

var api = require('lib/db-api');
var accepts = require('lib/accepts');
var express = require('express');
var log = require('debug')('civicstack:application');
var utils = require('lib/utils');
var admin = utils.admin;
var restrict = utils.restrict;
var pluck = utils.pluck;
var expose = utils.expose;
var handleError = utils.handleError;

var app = module.exports = express();

/**
 * Limit request to json format only
 */

app.use(accepts('application/json'));

var all = ['id name logo backgroundColor video description technology technologyids links',
            'organization github website country twitter license contact partnership',
            'comments tags approved tagids uploadedBy'].join(' ');

app.get('/applications', utils.admin, function (req, res) {
  log('Request /applications');

  api.application.all(function(err, applications) {
    if (err) return handleError(err, req, res);

    log('Serving applications %j', pluck(applications, "id"));

    res.json(applications.map(expose(all)));
  });
});

app.get('/applications/approved', function (req, res) {
  log('Request /applications/approved');

  api.application.approved(function(err, applications) {
    if (err) return handleError(err, req, res);

    log('Serving applications %j', pluck(applications, "id"));

    res.json(applications.map(expose(all)));
  });
});

app.get('/applications/:id', function (req, res) {
  log('Request GET /application/%s', req.params.id);

  api.application.get(req.params.id, function (err, application) {
    if (err) return handleError(err, req, res);
    if (!application) return res.send(404);

    log('Serving application %s', application.id);

    res.json(expose(all)(application.toJSON()));
  });
});

app.post('/applications/create', restrict, protect, function (req, res) {
  log('Request POST /applications/create %j', req.body);

  req.body.uploadedBy = req.user;
  if (req.body.license == '') delete req.body.license;

  api.application.create(req.body, function (err, application) {
    if (err) return handleError(err, req, res);

    log('Serving application %s', application.id);

    res.json(expose(all)(application.toJSON()));
  });
});

app.post('/applications/:id', admin, protect, function (req, res) {
  log('Request POST /applications/%s %j', req.params.id, req.body);

  if (req.body.license == '') delete req.body.license;
  req.body.video = utils.getEmbeddableYouTubeURL(req.body.video);

  api.application.update(req.body, function (err, app) {
    if (err) return handleError(err, req, res);

    log('Serving application %s', app.id);

    res.json(expose(all)(app.toJSON()));
  });
});

app.delete('/applications/:id', admin, function (req, res) {
  log('Request DEL /applications/%s %j', req.params.id, req.body);

  api.application.remove(req.params.id, function (err, id) {
    if (err) return handleError(err, req, res);

    log('Deleted application %s', id.id);

    res.sendStatus(200);
  });
});


function protect (req, res, next) {
  if (!req.user.admin) {
    delete req.body.approved;
  }
  next();
}