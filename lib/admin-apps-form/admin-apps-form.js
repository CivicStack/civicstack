/**
 * Module dependencies.
 */

var AppForm = require('./view');
var countries = require('countries');
var licenses = require('licenses');
var log = require('debug')('civicstack:admin-apps-form');
var page = require('page');
var request = require('request');
var tags = require('tags');
var technologies = require('technologies');

page('/admin/apps/create',
  tags.middleware,
  countries.middleware,
  licenses.middleware,
  technologies.middleware,
  function (ctx, next) {
  var form = new AppForm({
    el: '.admin-content',
    replace: true,
    data: {
      app: { }
    }
  });
});

page('/admin/apps/:id',
  tags.middleware,
  countries.middleware,
  licenses.middleware,
  technologies.middleware,
  load, function (ctx, next) {
  var form = new AppForm({
    el: '.admin-content',
    replace: true,
    data: {
      app: ctx.app
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

    var app = res.body;
    app.country = app.country.id;
    app.license = app.license ? app.license.id : null;
    ctx.app = app;
    return next();
  });
}
