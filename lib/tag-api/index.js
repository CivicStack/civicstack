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

var app = module.exports = express();

/**
 * Limit request to json format only
 */

app.use(accepts('application/json'));

app.get('/tags', function (req, res) {
  log('Request /tags');

  api.tag.all(function(err, tags) {
    if (err) return _handleError(err, req, res);

    log('Serving tags %j', pluck(tags, "id"));

    var keys = 'name';

    res.json(tags.map(expose(keys)));
  });
});

app.get('/tags/:id', function (req, res) {
  log('Request GET /tag/%s', req.params.id);

  api.tag.get(req.params.id, function (err, tag) {
    if (err) return _handleError(err, req, res);
    if (!tag) return res.send(404);

    log('Serving tag %s', tag.id);

    var keys = 'name';

    res.json(expose(keys)(tag.toJSON()));
  });
});
