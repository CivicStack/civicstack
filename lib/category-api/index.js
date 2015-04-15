/**
 * Module dependencies.
 */

var api = require('lib/db-api');
var accepts = require('lib/accepts');
var express = require('express');
var log = require('debug')('civicstack:country');
var utils = require('lib/utils');
var restrict = utils.restrict;
var pluck = utils.pluck;
var expose = utils.expose;
var handleError = utils.handleError;

var app = module.exports = express();

/**
 * Limit request to json format only
 */

app.use(accepts('application/json'));

app.get('/categories', function (req, res) {
  log('Request /categories');

  api.category.all(function(err, categories) {
    if (err) return handleError(err, req, res);

    log('Serving categories %j', pluck(categories, 'id'));

    var keys = 'id name';

    res.json(categories.map(expose(keys)));
  });
});

app.get('/categories/:id', function (req, res) {
  log('Request GET /categories/%s', req.params.id);

  api.category.get(req.params.id, function (err, category) {
    if (err) return handleError(err, req, res);
    if (!category) return res.send(404);

    log('Serving category %s', category.id);

    res.json(category.toJSON());
  });
});

app.post('/categories/create', restrict, function (req, res) {
  log('Request POST /categories/create %j', req.body);

  api.category.create(req.body, function (err, category) {
    if (err) return handleError(err, req, res);

    log('Serving category %s', category.id);

    res.json(category.toJSON());
  });
});

app.post('/categories/:id', restrict, function (req, res) {
  log('Request POST /categories/%s %j', req.params.id, req.body);

  api.category.update(req.body, function (err, category) {
    if (err) return handleError(err, req, res);

    log('Serving category %s', category.id);

    res.json(category.toJSON());
  });
});
