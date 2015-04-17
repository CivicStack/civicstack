/**
 * Module dependencies.
 */

var applications = require('applications').approved;
var categories = require('categories');
var countries = require('countries');
var Homepage = require('./view');
var page = require('page');
var tags = require('tags');
var technologies = require('technologies');

page('/',
  applications.middleware,
  categories.middleware,
  countries.middleware,
  technologies.middleware,
  tags.middleware,
  function(ctx, next) {
  var homepage = new Homepage({
    data: { applications: applications.items },
    el: '.site-content',
    replace: true
  });

  if (ctx.path == '/login') next();
});
