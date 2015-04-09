/**
 * Module dependencies.
 */

var AppForm = require('./view');
var classes = require('classes');
var page = require('page');
var tags = require('tags');
var user = require('user');

page('/apps/new', tags.middleware, user.required, function (ctx, next) {
  classes(document.body).add('app-form');

  var form = new AppForm({
    el: '.site-content',
    replace: true,
    data: {
      tags: tags.items
    }
  });
});
