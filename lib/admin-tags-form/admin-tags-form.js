/**
 * Module dependencies.
 */

var log = require('debug')('civicstack:admin-tags-form');
var page = require('page');
var request = require('request');
var tags = require('tags');
var TagForm = require('./view');

page('/admin/tags/create', function (ctx, next) {
  var form = new TagForm({
    el: '.admin-content',
    replace: true,
    data: {
      tag: {}
    }
  });
});

page('/admin/tags/:id', load, function (ctx, next) {
  var form = new TagForm({
    el: '.admin-content',
    replace: true,
    data: {
      tag: ctx.tag
    }
  });
});

function load(ctx, next) {
  request
  .get('/api/tags/' + ctx.params.id)
  .end(function(err, res) {
    if (err || !res.ok) {
      var message = 'Unable to load tag for ' + ctx.params.id;
      return log(message);
    };

    ctx.tag = res.body;
    return next();
  });
}
