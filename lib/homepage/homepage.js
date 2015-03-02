/**
 * Module dependencies.
 */

var applications = require('applications');
var empty = require('empty');
var Homepage = require('./view');
var page = require('page');

page('/', applications.middleware, function(ctx, next) {
  var container = document.querySelector('.site-content');

  var homepage = new Homepage({
    data: { applications: applications.items }
  });

  homepage.render('.site-content');
});
