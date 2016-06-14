/**
 * Module dependencies.
 */

var Detail = require('app-detail-view');
var empty = require('empty');
var log = require('debug')('civicstack:application-detail');
var page = require('page');
var request = require('request');
var user = require('user');

page('/apps/:id', user.optional, load, function(ctx, next) {
  var container = document.querySelector('.site-content');

  var detail = new Detail({
    data: { application: ctx.application, user: user, disqus: true },
    el: '.site-content',
    replace: true
  });
});

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
