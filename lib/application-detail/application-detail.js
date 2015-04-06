/**
 * Module dependencies.
 */

var Detail = require('./view');
var empty = require('empty');
var log = require('debug')('civicstack:application-detail');
var page = require('page');
var request = require('request');

page('/apps/:id', valid, load, function(ctx, next) {
  var container = document.querySelector('.site-content');

  var detail = new Detail({
    data: { application: ctx.application }
  });

  empty(container);
  detail.render('.site-content');
});

function valid(ctx, next) {
  if (/^[0-9a-fA-F]{24}$/.test(ctx.params.id)) return next();

  page.redirect('/');
}

function load(ctx, next) {
  log('fetch for %s', ctx.params.id);

  request
  .get('/api/applications/:id'.replace(':id', ctx.params.id))
  .end(function(err, res) {
    if (err || !res.ok) return log('Found error: %s', err || res.error);
    ctx.application = res.body;
    next();
  });
}
