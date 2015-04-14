/**
 * Module dependencies.
 */

var applications = require('applications').approved;
var countries = require('countries');
var Homepage = require('./view');
var page = require('page');
var technologies = require('technologies');

page('/',
  applications.middleware,
  countries.middleware,
  technologies.middleware,
  function(ctx, next) {
  var homepage = new Homepage({
    data: { applications: applications.items },
    el: '.site-content',
    replace: true
  });
});
