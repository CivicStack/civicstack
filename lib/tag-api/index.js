/**
 * Module dependencies.
 */

var api = require('lib/db-api');
var accepts = require('lib/accepts');
var express = require('express');
var log = require('debug')('civicstack:tag');
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

app.get('/tags', function (req, res) {
  log('Request /tags');

  api.tag.all(function(err, tags) {
    if (err) return handleError(err, req, res);

    log('Serving tags %j', pluck(tags, "id"));

    var keys = 'id name';

    res.json(tags.map(expose(keys)));
  });
});

app.get('/tags/:id', function (req, res) {
  log('Request GET /tag/%s', req.params.id);

  api.tag.get(req.params.id, function (err, tag) {
    if (err) return handleError(err, req, res);
    if (!tag) return res.send(404);

    log('Serving tag %s', tag.id);

    var keys = 'id name';

    res.json(expose(keys)(tag.toJSON()));
  });
});

app.post('/tags/create', admin, function (req, res) {
  log('Request POST /tags/create %j', req.body);

  api.tag.create(req.body, function (err, tag) {
    if (err) return handleError(err, req, res);

    log('Serving tag %s', tag.id);

    res.json(tag.toJSON());
  });
});

app.post('/tags/:id', admin, function (req, res) {
  log('Request POST /tag/%s', req.params.id);

  api.tag.update(req.body, function (err, tag) {
    if (err) return handleError(err, req, res);

    log('Serving tag %s', tag.id);

    res.json(tag);
  });
});

app.delete('/tags/:id', admin, function (req, res) {
  log('Request DEL /tags/%s %j', req.params.id, req.body);

  api.tag.remove(req.params.id, function (err, id) {
    if (err) return handleError(err, req, res);

    log('Deleted tag %s', id.id);

    res.sendStatus(200);
  });
});
