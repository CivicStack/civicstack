/**
 * Module dependencies.
 */

var language = require('language');
var render = require('render');
var Ractive = require('ractive');
var template = require('./template');

var header = new Ractive({
  isolated: true,
  template: render(template),
  el: '#site-footer',
  data: {
    lang: language()
  }
});
