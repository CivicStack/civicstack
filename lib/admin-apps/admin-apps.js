/**
 * Module dependencies.
 */

var page = require('page');
var apps = require('applications');
var AppsList = require('./view');

page('/admin/apps', apps.middleware, function (ctx, next) {
  var appslist = new AppsList({
    el: '.admin-content',
    replace: true,
    data: {
      apps: apps.items
    }
  });
});
