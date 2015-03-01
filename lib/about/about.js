/**
 * Module dependencies.
 */

var classes = require('classes');
var empty = require('empty');
var page = require('page');
var render = require('render');
var template = require('./template');

page('/about', function(ctx, next) {
  var container = document.querySelector('section.site-content');

  classes(document.body).add('about')
  empty(container).appendChild(render.dom(template));
});
