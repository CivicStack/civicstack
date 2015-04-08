/**
 * Module dependencies.
 */

var apps = require('applications');
var AppForm = require('./view');
var log = require('debug')('civicstack:admin-apps-form');
var page = require('page');
var request = require('request');
var tags = require('tags');

page('/admin/apps/create', tags.middleware, function (ctx, next) {
  var form = new AppForm({
    el: '.admin-content',
    replace: true,
    data: {
      app: { },
      tags: tags.items
    }
  });
});

page('/admin/apps/:id', tags.middleware, load, function (ctx, next) {
  var form = new AppForm({
    el: '.admin-content',
    replace: true,
    data: {
      app: ctx.app,
      tags: tags.items
    }
  });
});

function load(ctx, next) {
  request
  .get('/api/applications/' + ctx.params.id)
  .end(function(err, res) {
    if (err || !res.ok) {
      var message = 'Unable to load app for ' + ctx.params.id;
      return log(message);
    };

    ctx.app = res.body;
    return next();
  });
}
