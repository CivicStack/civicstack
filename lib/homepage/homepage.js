/**
 * Module dependencies.
 */

var applications = require('applications').approved;
var countries = require('countries');
var filters = require('filters');
var Homepage = require('./view');
var page = require('page');
var tags = require('tags');
var technologies = require('technologies');

page('/',
  applications.middleware,
  countries.middleware,
  technologies.middleware,
  tags.middleware,
  function(ctx, next) {
  var homepage = new Homepage({
    data: { applications: applications.items },
    el: '.site-content',
    replace: true
  });

  homepage.set('filters', filters.reset());

  if (ctx.path == '/login') next();
});
