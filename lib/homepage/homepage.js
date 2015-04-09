/**
 * Module dependencies.
 */

var applications = require('applications').approved;
var Homepage = require('./view');
var page = require('page');

page('/', applications.middleware, function(ctx, next) {
  var homepage = new Homepage({
    data: { applications: applications.items },
    el: '.site-content',
    replace: true
  });
});
