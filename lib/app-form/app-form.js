/**
 * Module dependencies.
 */

var AppForm = require('./view');
var classes = require('classes');
var page = require('page');

page('/apps/new', function (ctx, next) {
  classes(document.body).add('app-form');

  var form = new AppForm({
    el: '.site-content',
    replace: true
  });
});
