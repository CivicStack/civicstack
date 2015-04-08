/**
 * Module dependencies.
 */

var AppForm = require('./view');
var classes = require('classes');
var page = require('page');
var tags = require('tags');

page('/apps/new', tags.middleware, function (ctx, next) {
  classes(document.body).add('app-form');

  var form = new AppForm({
    el: '.site-content',
    replace: true,
    data: {
      tags: tags.items
    }
  });
});
