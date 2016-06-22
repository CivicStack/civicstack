/**
 * Module dependencies.
 */

var AppForm = require('./view');
var classes = require('classes');
var countries = require('countries');
var licenses = require('licenses');
var page = require('page');
var tags = require('tags');
var technologies = require('technologies');
var user = require('user');

page('/apps/new',
  user.required,
  tags.middleware,
  countries.middleware,
  licenses.middleware,
  technologies.middleware,
  function (ctx, next) {
  classes(document.body).add('app-form');

  var form = new AppForm({
    el: '.site-content',
    replace: true
  });
});
